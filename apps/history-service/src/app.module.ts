import { LibCoreModule } from '@app/common/modules';
import { ENUM_QUEUES, LibMongoModule, LibRabbitMQModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		LibCoreModule,
		LibRabbitMQModule.registerAsync({ name: ENUM_QUEUES.LOGGING_ACTION }),
		LibMongoModule.forRootAsync(),
    ScheduleModule.forRoot()
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
