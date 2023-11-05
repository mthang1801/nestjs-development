import { TradeAccountHistory } from '@app/common';
import { ClientTradeAccountHistoryFilterQueryDto } from '@app/common/modules/client/dto/client-trade-account-history-filter-query.dto';
import { TradeAccountService } from '@app/common/modules/trade-account/trade-account.service';
import { ApiResponseCustom } from '@app/shared/swagger';
import {
  Controller,
  Get,
  Param,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('trade-accounts')
@ApiTags('Trade Account')
export class TradeAccountController {
	constructor(
    private readonly tradeAccountService : TradeAccountService
	) {}

	@Get(':client_account/histories')
	@ApiResponseCustom({
		summary: 'Danh sách lịch sử giao dịch',
		responseType: TradeAccountHistory,
	})
	async findAndCountAllTradeAccountHistory(
		@Param('client_account') client_account: string,
		@Query() filterQuery: ClientTradeAccountHistoryFilterQueryDto,
	) {
		return this.tradeAccountService.findAllByClientAccount(
			client_account,
			filterQuery,
		);
	}
}
