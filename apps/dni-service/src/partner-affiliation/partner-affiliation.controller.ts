import { PartnerAffiliationEmailDto } from '@app/common/modules/partner-affilication/dto/partner-affiliation.dto';
import { PartnerAffiliaionService } from '@app/common/modules/partner-affilication/partner-affilication.service';
import { ApiResponseCustom } from '@app/shared/swagger';
import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IUserRequest } from '@app/shared/interfaces';
import { PartnerAffiliationClientAccountDto } from '@app/common/modules/partner-affilication/dto/partner-affiliation-account.dto';
import { Public } from '@app/shared/decorators';

@Controller('partner-affiliation')
@ApiTags('Partner Affiliation')
export class PartnerAffiliationController {
	constructor(
		private readonly partnerAffiliationService: PartnerAffiliaionService,
	) {}

	@Post('check-email')
	@ApiResponseCustom({
		body: PartnerAffiliationEmailDto,
		summary: 'Đăng nhập TK bằng email hoặc phone',
	})
	async checkAffiliationEmail(
		@Body() payload: PartnerAffiliationEmailDto,
		@Req() request: IUserRequest,
	) {
		return await this.partnerAffiliationService.checkAffiliationEmail(
			payload,
			request['exness-token'],
		);
	}

	@Post('check-account')
	@ApiResponseCustom({
		body: PartnerAffiliationClientAccountDto,
		summary: 'Đăng nhập TK bằng email hoặc phone',
	})
	async checkAffiliationAccount(
		@Body() payload: PartnerAffiliationClientAccountDto,
		@Req() request: IUserRequest,
	) {
		return await this.partnerAffiliationService.checkAffiliationAccount(
			payload,
			request['exness-token'],
		);
	}

	@Post('check-rebate')
	@ApiResponseCustom({
		body: PartnerAffiliationClientAccountDto,
		summary: 'Đăng nhập TK bằng email hoặc phone',
	})
	async checkRebate(
		@Body() payload: PartnerAffiliationClientAccountDto,
		@Req() request: IUserRequest,
	) {
		return await this.partnerAffiliationService.checkRebate(
			payload,
			request['exness-token'],
		);
	}

	@Patch('set-rebate')
	@ApiResponseCustom({
		body: PartnerAffiliationClientAccountDto,
		summary: 'Đăng nhập TK bằng email hoặc phone',
	})
	async setRebate(
		@Body() payload: PartnerAffiliationClientAccountDto,
		@Req() request: IUserRequest,
	) {
		return await this.partnerAffiliationService.setRebate(
			payload,
			request['exness-token'],
		);
	}
}
