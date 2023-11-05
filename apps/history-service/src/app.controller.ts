import { ActionHistory } from '@app/common';
import { ActionHistoryService } from '@app/common/modules';
import {
  ENUM_EVENT_PATTERN,
  RMQClientService,
} from '@app/shared';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  RpcException
} from '@nestjs/microservices';
@Controller()
export class AppController {
	logger = new Logger(AppController.name);

	constructor(
		private readonly rmqClientService: RMQClientService,
		private readonly actionHistoryService: ActionHistoryService,
	) {}

	@EventPattern(ENUM_EVENT_PATTERN.SAVE_ACTION)
	async saveLogAction(
		@Payload() payload: ActionHistory<any, any>,
		@Ctx() context: RmqContext,
	) {
		this.logger.log(`${'*'.repeat(20)} saveLogAction() ${'*'.repeat(20)}`);
		try {
			await this.actionHistoryService.save(payload);
		} catch (error) {
			throw new RpcException(error.message);
		} finally {
			this.rmqClientService.ack(context);
		}
	}
}
