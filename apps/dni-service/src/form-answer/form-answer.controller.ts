import { FormAnswer } from '@app/common';
import { CreateFormAnswerDto } from '@app/common/modules/form-answer/dto/create-form-answer.dto';
import { FormAnswerFilterQueryDto } from '@app/common/modules/form-answer/dto/form-answer-filter-query.dto';
import { FormAnswerService } from '@app/common/modules/form-answer/form-answer.service';
import { WsThrottlerGuard } from '@app/common/modules/throttler/throttler.gateway';
import { MongooseClassSerialzierInterceptor } from '@app/shared';
import { Public } from '@app/shared/decorators';
import { ApiListResponseCustom, ApiResponseCustom } from '@app/shared/swagger';
import {
	Body,
	Controller,
	Get,
	Post,
	Query,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, seconds } from '@nestjs/throttler';
import { Request } from 'express';

@Controller('form-answers')
@ApiTags('Form Answer')
export class FormAnswerController {
	constructor(private readonly formAnswerService: FormAnswerService) {}

	@Post()
	@Public()
	@ApiResponseCustom({
		body: CreateFormAnswerDto,
		summary: 'Điền form',
	})
	@UseGuards(WsThrottlerGuard)
	@Throttle({ default: { limit: 1, ttl: seconds(60) } })
	async createFormAnswer(
		@Body() payload: CreateFormAnswerDto,
		@Req() req: Request,
	) {
		return await this.formAnswerService.createFormAnswer(payload, req);
	}

	@Get()
	@UseInterceptors(MongooseClassSerialzierInterceptor(FormAnswer))
	@ApiListResponseCustom({
		responseType: FormAnswer,
		summary: 'Lấy danh sách câu trả lời form',
	})
	async getList(@Query() query: FormAnswerFilterQueryDto) {
		return await this.formAnswerService.findAndCountAll(query);
	}
}
