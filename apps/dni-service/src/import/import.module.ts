import { LibCoreModule } from '@app/common/modules';
import { LibImportModule } from '@app/common/modules/import/import.module';
import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';

@Module({
	imports: [LibCoreModule, LibImportModule],
	controllers: [ImportController],
})
export class ImportModule {}
