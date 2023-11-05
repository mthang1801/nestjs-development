import { LibCoreModule } from '@app/common/modules';
import { LibRabbitMQModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { LogModule } from './log/log.module';
import { MailModule } from './mail/mail.module';
import { SaveInfoModule } from './save-info/save-info.module';
import { SaveOtherSchemaInfoModule } from './save-other-schema-info/save-other-schema-info.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ReportModule } from './report/report.module';

@Module({
	imports: [
		LibCoreModule,
		LibRabbitMQModule,
		MailModule,
		SaveInfoModule,
		SaveOtherSchemaInfoModule,
		ClientModule,
    SchedulerModule,
    LogModule,
    ReportModule
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
