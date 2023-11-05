import { LibCoreModule } from '@app/common/modules';
import { AuthGuard } from '@app/common/modules/auth/guards/auth.guard';
import { ConnectExnessInterceptor } from '@app/shared/interceptors/connect-exness.interceptor';
import { LibTelegramService } from '@app/shared/telegram/telegram.service';
import { Module, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { NestMiddlewareConsumer } from 'nestjs-i18n/dist/types';
import { ActionHistoryModule } from './action-history/action-history.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ExportModule } from './export/export.module';
import { FormAnswerModule } from './form-answer/form-answer.module';
import { FormModule } from './form/form.module';
import { GroupModule } from './group/group.module';
import { ImportModule } from './import/import.module';
import { MasterDniModule } from './master-dni/master-dni.module';
import { MenuFunctionModule } from './menu-function/menu-function.module';
import { PartnerAffiliationModule } from './partner-affiliation/partner-affiliation.module';
import { ReportModule } from './report/report.module';
import { ResourceModule } from './resource/resource.module';
import { RoleModule } from './role/role.module';
import { TradeAccountModule } from './trade-account/trade-account.module';
import { UserModule } from './user/user.module';
@Module({
	imports: [
		LibCoreModule,
		AuthModule,
		UserModule,
		ClientsModule,
		PartnerAffiliationModule,
		RoleModule,
		GroupModule,
		MasterDniModule,
		MenuFunctionModule,
		ResourceModule,
		FormModule,
		FormAnswerModule,
    TradeAccountModule,
    ImportModule,
    ActionHistoryModule,
    ExportModule,
    ReportModule
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AuthGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ConnectExnessInterceptor,
		},
	],
})
export class AppModule implements OnApplicationShutdown, NestModule {
	constructor(
		private readonly telegramService: LibTelegramService,
		private readonly configService: ConfigService,
	) {}

	configure(consumer: NestMiddlewareConsumer) {
		consumer.apply(helmet(), compression(), cookieParser()).forRoutes('*');
	}

	async onApplicationShutdown() {
		await this.telegramService.sendMessage('❌[DNI CORE Service] Shutdown');
	}
}
