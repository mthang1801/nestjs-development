import { ReportService } from '@app/common/modules/report';
import { FilterQuerySummaryReportDto } from '@app/common/modules/report/dto/filter-query-summary-report.dto';
import { FilterQueryTopClientDto } from '@app/common/modules/report/dto/filter-query-top-reward-client.dto';
import { ResponseSummaryReportDto } from '@app/common/modules/report/dto/response-summary-report.dto';
import { ResponseTopRewardClientDto } from '@app/common/modules/report/dto/response-top-reward-client.dto';
import { RewardReportFilterQueryDto } from '@app/common/modules/report/dto/reward-report-filter-query.dto';
import { WsThrottlerGuard } from '@app/common/modules/throttler/throttler.gateway';
import { Public } from '@app/shared/decorators';
import { IUserRequest } from '@app/shared/interfaces';
import { ApiListResponseCustom, ApiResponseCustom } from '@app/shared/swagger';
import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, seconds } from '@nestjs/throttler';
import { Request } from 'express';

@Controller('reports')
@ApiTags('Report')
export class ReportController {
	constructor(private readonly reportService: ReportService) {}
	@Post('visit-page')
	@UseGuards(WsThrottlerGuard)
	@Throttle({ default: { limit: 1, ttl: seconds(60) } })
	@Public()
	async visitPage(@Req() req: Request) {
		await this.reportService.visitPage(req);
	}

	@Get('reward-report')
	@ApiListResponseCustom({
		summary: 'Biểu đồ lợi nhuận của công ty',
	})
	async getRewardReport(
		@Query() query: RewardReportFilterQueryDto,
		@Req() request: IUserRequest,
	) {
		return await this.reportService.getRewardReport(
			query,
			request['exness-token'],
		);
	}

	@Get('summary')
	@ApiListResponseCustom({
		summary: 'Summary Report',
		responseType: ResponseSummaryReportDto,
	})
	async summary(
		@Query() filterQuerySummaryReportDto: FilterQuerySummaryReportDto,
	) {
		return this.reportService.summary(filterQuerySummaryReportDto);
	}

	@Get('top-reward-clients')
	@ApiListResponseCustom({
		summary: 'Top Client Reward',
		responseType: ResponseTopRewardClientDto,
	})
	async topRewardClients(
		@Query() filterQueryTopClientDto: FilterQueryTopClientDto,
	) {
		return this.reportService.topRewardClients(filterQueryTopClientDto);
	}
}
