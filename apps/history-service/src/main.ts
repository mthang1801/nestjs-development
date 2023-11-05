import { ENUM_QUEUES } from '@app/shared';
import { MorganLogger } from '@app/shared/logger/morgan.logger';
import { WinstonLogger } from '@app/shared/logger/winston.logger';
import { RMQClientService } from '@app/shared/rabbitmq/rabbitmq-client.service';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LibTelegramService } from '@app/shared/telegram/telegram.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonLogger('Log SVC'),
	});
	app.use(MorganLogger());
	mongoose.set('debug', true);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	const rmqService = app.get<RMQClientService>(RMQClientService);
	app.connectMicroservice<MicroserviceOptions>(
		rmqService.getConsumer({ queue: ENUM_QUEUES.LOGGING_ACTION, isAck: true }),
	);
	await app.startAllMicroservices();
	const configService = app.get<ConfigService>(ConfigService);
	const telegramService = app.get<LibTelegramService>(LibTelegramService);

	await await app.listen(configService.get<number>('LOG_PORT'), async () => {
		Logger.log(`Server is running on ${await app.getUrl()}`);
		await telegramService.sendMessage(
			`🔥[LOG Service] is running on ${await app.getUrl()}`,
		);
	});
}
bootstrap();
