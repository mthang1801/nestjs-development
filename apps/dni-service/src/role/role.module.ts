import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { LibRoleModule } from '@app/common/modules/role/role.module';

@Module({
	imports: [LibRoleModule],
	controllers: [RoleController],
})
export class RoleModule {}
