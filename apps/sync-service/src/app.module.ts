import { LibCoreModule } from '@app/common/modules';
import { LibRabbitMQModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { CronjobModule } from './cronjob/cronjob.module';

@Module({
	imports: [
		LibCoreModule,
		LibRabbitMQModule,
    ClientModule,
    CronjobModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
