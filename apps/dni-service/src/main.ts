import { ACK_QUEUES, ENUM_QUEUES, RMQClientService } from '@app/shared';
import { viewEngineConfig } from '@app/shared/config/viewEngine.config';
import { MorganLogger } from '@app/shared/logger/morgan.logger';
import { WinstonLogger } from '@app/shared/logger/winston.logger';
import { SetupSwagger } from '@app/shared/swagger/setup';
import { LibTelegramService } from '@app/shared/telegram/telegram.service';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: WinstonLogger('DNI Service'),
	});

	app.use(MorganLogger());

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		credentials: true,
	});

	app.setGlobalPrefix('api', { exclude: ['/'] });

	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
		defaultVersion: ['1'],
	});

	viewEngineConfig(app);

	SetupSwagger(app, {
		apiEndpoint: 'documentation',
		theme: 'FLATTOP',
		title: 'DNI API',
		icon: 'DEFAULT',
	});

	mongoose.set('debug', true);
	const rmqClientService = app.get<RMQClientService>(RMQClientService);

	[ENUM_QUEUES.EXPORT].map((queue) => {
		const isAck = ACK_QUEUES.includes(queue);
		app.connectMicroservice(rmqClientService.getConsumer({ queue, isAck }));
	});

	await app.startAllMicroservices();

	const configService = app.get<ConfigService>(ConfigService);
	const telegramService = app.get<LibTelegramService>(LibTelegramService);
	await app.listen(configService.get<number>('DNI_PORT'), async () => {
		Logger.log(`Server is running on ${await app.getUrl()}`);
		await telegramService.sendMessage(
			`🔥[DNI Service] is running on ${await app.getUrl()}`,
		);
	});
}
bootstrap();
