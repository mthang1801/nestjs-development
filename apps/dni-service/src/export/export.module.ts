import { LibExportModule } from '@app/common/modules/export/export.module';
import { Module } from '@nestjs/common';
import { ExportController } from './export.controller';

@Module({
	imports: [LibExportModule],
  controllers : [ExportController]
})
export class ExportModule {}
