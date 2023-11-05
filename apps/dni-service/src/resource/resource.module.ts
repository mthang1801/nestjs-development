import { LibResourceModule } from '@app/common/modules/resource/resource.module';
import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';

@Module({
	imports: [LibResourceModule],
	controllers: [ResourceController],
})
export class ResourceModule {}
