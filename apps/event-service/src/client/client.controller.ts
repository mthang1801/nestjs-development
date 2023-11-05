import { ClientService } from '@app/common/modules/client/client.service';
import { ClientAccountFilterQueryDto } from '@app/common/modules/client/dto/client-account-filter-query.dto';
import { Client } from '@app/common/schemas/client.schema';
import {
	ENUM_EVENT_PATTERN,
	ENUM_MESSAGE_PATTERN,
	RMQClientService,
} from '@app/shared';
import { Controller, Logger } from '@nestjs/common';
import {
	Ctx,
	EventPattern,
	MessagePattern,
	Payload,
	RmqContext,
} from '@nestjs/microservices';
@Controller()
export class ClientController {
	logger = new Logger(ClientController.name);
	constructor(
		private readonly clientService: ClientService,
		private readonly rmqService: RMQClientService,
	) {}

	@MessagePattern({ cmd: ENUM_MESSAGE_PATTERN.SYNC_CLIENT_ACCOUNT })
	async onSyncClientAccount(
		@Payload('client') client: Client,
		@Payload('filterQuery') filterQuery: ClientAccountFilterQueryDto,
	) {
		this.logger.log('************ onSaveClientAccount *************');
		return await this.clientService.syncClientAccount(
			client,
			filterQuery,
			'FAST',
			true,
		);
	}

	@EventPattern(ENUM_EVENT_PATTERN.IMPORT_CLIENT)
	async onImportClientAccount(
		@Payload('data') data: Client[],
		@Ctx() ctx: RmqContext,
	) {
		this.logger.log('************ onImportClientAccount *************');
		await this.clientService.importData(data);
		this.rmqService.ack(ctx);
	}
}
