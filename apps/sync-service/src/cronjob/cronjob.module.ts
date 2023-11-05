import { LibCoreModule } from '@app/common/modules';
import { LibClientModule } from '@app/common/modules/client/client.module';
import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';

@Module({
	imports: [LibCoreModule, LibClientModule],
	providers: [CronjobService],
})
export class CronjobModule {}
