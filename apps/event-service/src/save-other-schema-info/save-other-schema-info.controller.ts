import { ENUM_EVENT_PATTERN } from '@app/shared';
import { AbstractType } from '@app/shared/abstract/types/abstract.type';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SaveOtherSchemaInfoService } from './save-other-schema-info.service';

@Controller()
export class SaveOtherSchemaInfoController {
	logger = new Logger(SaveOtherSchemaInfoController.name);
	constructor(private readonly saveOtherSchemaInfoService: SaveOtherSchemaInfoService) {}

	@EventPattern(ENUM_EVENT_PATTERN.SAVE_OTHER_SCHEMA_INFO)
	async onSaveOtherSchemaInfo(
		@Payload() payload: AbstractType.SaveOtherSchemaInfoPayload<any>,
	) {
		this.logger.log('************ onSaveOtherSchemaInfo **************');
		return this.saveOtherSchemaInfoService.onSaveOtherSchemaInfo(payload);
	}

	@EventPattern(ENUM_EVENT_PATTERN.SAVE_OTHER_SCHEMA_INFO_UPDATE_MANY)
	async onSaveOtherSchemaInfoForUpdateMany(
		@Payload() payload: AbstractType.SaveOtherSchemaInfoUpdateManyPayload<any>,
	) {
		this.logger.log('************ onSaveOtherSchemaInfoForUpdateMany **************');
		return this.saveOtherSchemaInfoService.onSaveOtherSchemaInfoForUpdateMany(payload);
	}
}
