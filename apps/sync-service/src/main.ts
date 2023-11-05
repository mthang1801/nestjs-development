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
		logger: WinstonLogger('SYNC Service'),
	});
	app.use(MorganLogger());
	mongoose.set('debug', true);

	const rmqClientService = app.get<RMQClientService>(RMQClientService);

	[ENUM_QUEUES.SYNC_CLIENT_ACCOUNT].map((queue) => {
		const prefetchCount = PREFETCH_COUNT[queue] ?? 10;
		const isAck = ACK_QUEUES.includes(queue);
		app.connectMicroservice(
			rmqClientService.getConsumer({ queue, prefetchCount, isAck }),
		);
	});

	await app.startAllMicroservices();
	const configService = app.get<ConfigService>(ConfigService);
	const telegramService = app.get<LibTelegramService>(LibTelegramService);

	await app.listen(configService.get<number>('SYNC_PORT'), async () => {
		Logger.log(`Server is running on ${await app.getUrl()}`);
		await telegramService.sendMessage(
			`🔥[SYNC Service] is running on ${await app.getUrl()}`,
		);
	});
}
bootstrap();
