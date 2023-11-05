import { ReportService } from '@app/common/modules/report';
import { ENUM_EVENT_PATTERN, RMQClientService } from '@app/shared';
import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Request } from 'express';

@Controller()
export class ReportController {
	logger = new Logger(ReportController.name);
	constructor(
		private readonly rmqService: RMQClientService,
		private readonly reportService: ReportService,
	) {}
	@EventPattern(ENUM_EVENT_PATTERN.REPORT_FORM_ANSWER)
	async onReportFormAnswer(
		@Payload('email') email: string,
		@Ctx() ctx: RmqContext,
	) {
		this.logger;
		await this.reportService.formAnswer(email);
		this.rmqService.ack(ctx);
	}
}
