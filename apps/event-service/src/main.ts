import {
	ACK_QUEUES,
	ENUM_QUEUES,
	PREFETCH_COUNT,
	RMQClientService,
} from '@app/shared';
import { MorganLogger } from '@app/shared/logger/morgan.logger';
import { WinstonLogger } from '@app/shared/logger/winston.logger';
import { LibTelegramService } from '@app/shared/telegram/telegram.service';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonLogger('EVENTS Service'),
	});
	app.use(MorganLogger());
	mongoose.set('debug', true);

	const rmqClientService = app.get<RMQClientService>(RMQClientService);

	[
		ENUM_QUEUES.MAIL_SERVICE,
		ENUM_QUEUES.SAVE_INFO,
		ENUM_QUEUES.SAVE_OTHER_SCHEMA_INFO,
		ENUM_QUEUES.SAVE_OTHER_SCHEMA_INFO_UPDATE_MANY,
		ENUM_QUEUES.PUB_SUB_CLIENT_ACCOUNT,
		ENUM_QUEUES.TELEGRAM,
		ENUM_QUEUES.SAVE_LOG,
		ENUM_QUEUES.REPORT,
		ENUM_QUEUES.IMPORT,
	].map((queue) => {
		const isAck = ACK_QUEUES.includes(queue);
		const prefetchCount = PREFETCH_COUNT[queue] ?? 10;
		app.connectMicroservice(
			rmqClientService.getConsumer({
				queue,
				isAck,
				prefetchCount,
			}),
		);
	});

	await app.startAllMicroservices();
	const configService = app.get<ConfigService>(ConfigService);
	const telegramService = app.get<LibTelegramService>(LibTelegramService);

	await await app.listen(configService.get<number>('EVENTS_PORT'), async () => {
		Logger.log(`Server is running on ${await app.getUrl()}`),
			await telegramService.sendMessage(
				`🔥[EVENTS Service] is running on ${await app.getUrl()}`,
			);
	});
}
bootstrap();
