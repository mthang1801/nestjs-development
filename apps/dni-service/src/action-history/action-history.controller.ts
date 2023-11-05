import { ActionHistoryFilterQueryDto, ActionHistoryService } from '@app/common';
import { ActionHistory } from '@app/common/schemas';
import { ApiResponseCustom } from '@app/shared/swagger';
import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('action-histories')
@ApiTags('Action History')
export class ActionHistoryController {
	constructor(private readonly actionHistoryService: ActionHistoryService) {}
	@Get()
	@ApiResponseCustom({
		summary: 'Danh sách action history',
		responseType: ActionHistory,
	})
	async findAll(@Query() query: ActionHistoryFilterQueryDto) {
		console.log('********** Action History *************');
		return this.actionHistoryService.findAll(query);
	}

	@Delete(':id')
	@ApiResponseCustom({ summary: 'Xoá action History', httpCode: 200 })
	async delete(@Param('id') id: string) {
		return this.actionHistoryService.delete(id);
	}
}
