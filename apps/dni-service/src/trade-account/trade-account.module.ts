import { LibTradeAccountModule } from '@app/common/modules/trade-account/trade-account.module';
import { Module } from '@nestjs/common';
import { TradeAccountController } from './trade-account.controller';
@Module({
	imports: [
		LibTradeAccountModule,
	],
	controllers: [TradeAccountController],
})
export class TradeAccountModule {}
