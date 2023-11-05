import { Module } from '@nestjs/common';
import { LibPartnerAffiliationModule } from '@app/common/modules/partner-affilication/partner-affiliation.module';
import { PartnerAffiliationController } from './partner-affiliation.controller';

@Module({
	imports: [LibPartnerAffiliationModule],
	controllers: [PartnerAffiliationController],
})
export class PartnerAffiliationModule {}
