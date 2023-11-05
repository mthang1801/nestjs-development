import { LibClientModule } from '@app/common/modules/client/client.module';
import { Module, forwardRef } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { LibTradeAccountHistoryModule } from '@app/common/modules/trade-account-history/trade-account-history.module';

@Module({
	imports: [LibClientModule, forwardRef(() => LibTradeAccountHistoryModule)],
	controllers: [ClientsController],
	providers: [],
})
export class ClientsModule {}
