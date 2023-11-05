import { Controller, Logger } from '@nestjs/common';
import { SaveInfoService } from './save-info.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ENUM_EVENT_PATTERN } from '@app/shared';
import { AbstractType } from '@app/shared/abstract/types/abstract.type';

@Controller()
export class SaveInfoController {
	logger = new Logger(SaveInfoController.name);
	constructor(private readonly saveInfoService: SaveInfoService) {}

	@EventPattern(ENUM_EVENT_PATTERN.SAVE_INFO)
	async onSaveInfo(@Payload() payload: AbstractType.SaveInfoPayload) {
		this.logger.log('************ onSaveInfo **************');
		return this.saveInfoService.onSaveInfo(payload);
	}
}
