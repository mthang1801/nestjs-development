import { SaveLogDto } from '@app/common/modules/log/dto/save-log.dto';
import { LogService } from '@app/common/modules/log/log.service';
import { ENUM_EVENT_PATTERN, RMQClientService } from '@app/shared';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class LogController {
	constructor(
		private readonly rmqService: RMQClientService,
		private readonly logService: LogService,
	) {}
  
	@EventPattern(ENUM_EVENT_PATTERN.SAVE_LOG)
	async saveLog(@Payload() payload : SaveLogDto, @Ctx() ctx: RmqContext) {
		await this.logService.saveLog(payload);
		this.rmqService.ack(ctx);
	}

	@EventPattern(ENUM_EVENT_PATTERN.TELEGRAM_MESSAGE)
	async publishMessageToTelegram(
		@Payload() { message }: { message: string },
	) {
		await this.logService.publishMessageToTelegram(message);
	}
}
