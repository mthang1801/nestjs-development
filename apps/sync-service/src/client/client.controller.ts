import { ClientService } from '@app/common/modules/client/client.service';
import { ClientAccountFilterQueryDto } from '@app/common/modules/client/dto/client-account-filter-query.dto';
import { Client } from '@app/common/schemas/client.schema';
import { ENUM_EVENT_PATTERN, RMQClientService } from '@app/shared';
import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
@Controller()
export class ClientController {
	logger = new Logger(ClientController.name);
	constructor(
		private readonly clientService: ClientService,
		private readonly rmqService: RMQClientService,
	) {}

	@EventPattern(ENUM_EVENT_PATTERN.SYNC_CLIENT_ACCOUNT)
	async onSaveClientAccount(
		@Payload('client') client: Client,
		@Payload('filterQuery') filterQuery: ClientAccountFilterQueryDto,
		@Ctx() ctx: RmqContext,
	) {
		this.logger.log('************ onSaveClientAccount *************');
   
		await this.rmqService.handlePubSubMessage(
			this.clientService.syncClientAccount(client, filterQuery),
			ctx,
		);
	}
}
