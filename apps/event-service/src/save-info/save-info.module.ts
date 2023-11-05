import { LibCoreModule } from '@app/common/modules';
import { LibClientModule } from '@app/common/modules/client/client.module';
import { LibFormModule } from '@app/common/modules/form/form.module';
import { LibGroupModule } from '@app/common/modules/group/group.module';
import { LibMenuFunctionModule } from '@app/common/modules/menu-function/menu-function.module';
import { LibResourceModule } from '@app/common/modules/resource/resource.module';
import { LibRoleModule } from '@app/common/modules/role/role.module';
import { LibTradeAccountHistoryModule } from '@app/common/modules/trade-account-history/trade-account-history.module';
import { LibTradeAccountModule } from '@app/common/modules/trade-account/trade-account.module';
import { LibUserModule } from '@app/common/modules/user/user.module';
import { Module } from '@nestjs/common';
import { SaveInfoController } from './save-info.controller';
import { SaveInfoService } from './save-info.service';

@Module({
	imports: [
		LibCoreModule,
		LibClientModule,
		LibFormModule,
		LibUserModule,
		LibRoleModule,
		LibResourceModule,
		LibMenuFunctionModule,
		LibGroupModule,
    LibTradeAccountModule,
    LibTradeAccountHistoryModule
	],
	controllers: [SaveInfoController],
	providers: [SaveInfoService],
})
export class SaveInfoModule {}
