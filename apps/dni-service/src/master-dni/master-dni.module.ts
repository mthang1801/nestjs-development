import { LibMasterDniModule } from '@app/common/modules/master-dni/master-dni.module';
import { Module } from '@nestjs/common';
import { MasterDniController } from './master-dni.controller';
@Module({
	imports: [LibMasterDniModule],
	controllers: [MasterDniController],
})
export class MasterDniModule {}
