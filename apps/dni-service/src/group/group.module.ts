import { Module } from '@nestjs/common';
import { LibGroupModule } from '@app/common/modules/group/group.module';
import { GroupController } from './group.controller';

@Module({
	imports: [LibGroupModule],
	controllers: [GroupController],
})
export class GroupModule {}
