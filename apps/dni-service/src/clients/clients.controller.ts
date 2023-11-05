import { ClientService } from '@app/common/modules/client/client.service';
import { ClientFilterQueryDto } from '@app/common/modules/client/dto/client-filter-query.dto';
import { ClientTradeAccountFilterQueryDto } from '@app/common/modules/client/dto/client-trade-account-filter-query.dto';
import { CreateClientDto } from '@app/common/modules/client/dto/create-client.dto';
import { SyncAllClientDto } from '@app/common/modules/client/dto/sync-all-client.dto';
import { SyncClientDto } from '@app/common/modules/client/dto/sync-client.dto';
import { UpdateClientDto } from '@app/common/modules/client/dto/update-client.dto';
import { TradeAccountResponseDto } from '@app/common/modules/trade-account/dto/trade-account-response.dto';
import { Client } from '@app/common/schemas/client.schema';
import { MongooseClassSerialzierInterceptor } from '@app/shared';
import {
  ApiCreatedResponseCustom,
  ApiListResponseCustom,
  ApiResponseCustom,
} from '@app/shared/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Clients')
export class ClientsController {
	constructor(private readonly clientService: ClientService) {}

	@Post()
	@ApiCreatedResponseCustom({
		summary: 'Tạo client',
		body: CreateClientDto,
		responseType: Client,
	})
	async create(@Body() createClientDto: CreateClientDto) {
		return this.clientService.create(createClientDto);
	}

	@Post('sync')
	@ApiResponseCustom({
		summary: 'Đồng bộ client',
		httpCode: 200,
		body: SyncClientDto,
	})
	async sync(@Body() syncClientDto: SyncClientDto) {
		return this.clientService.sync(syncClientDto);
	}

	@Post('sync-all')
	@ApiResponseCustom({
		summary: 'Đồng bộ tất cả Client',
		httpCode: 200,
		body: SyncAllClientDto,
	})
	async syncAll(@Body() syncAllClientDto: SyncAllClientDto) {
		return this.clientService.syncAll(syncAllClientDto);
	}

	@Put(':id')
	@ApiResponseCustom({
		summary: 'Cập nhật theo id',
		body: UpdateClientDto,
	})
	async update(
		@Param('id') id: string,
		@Body() updateClientDto: UpdateClientDto,
	) {
		return this.clientService.update(id, updateClientDto);
	}

	@Get()
	@UseInterceptors(MongooseClassSerialzierInterceptor(Client))
	@ApiListResponseCustom({
		responseType: Client,
		summary: 'Lấy danh sách khách hàng',
	})
	async getList(@Query() query: ClientFilterQueryDto) {
		return await this.clientService.findAndCountAll(query);
	}

	@Get(':id')
	@ApiResponseCustom({ summary: 'Chi tiết client', responseType: Client })
	async findById(@Param('id') id: string) {
		return this.clientService.findById(id);
	}

	@Get(':id/trade-accounts')
	@ApiListResponseCustom({
		summary: 'Danh sách tài khoản của client',
		responseType: TradeAccountResponseDto,
	})
	async findAndCountAllTradeAccounts(
		@Param('id') id: string,
		@Query() filterQuery: ClientTradeAccountFilterQueryDto,
	) {
		return this.clientService.findAndCountAllTradeAccounts(id, filterQuery);
	}
}
