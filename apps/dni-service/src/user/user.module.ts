import { LibUserModule } from '@app/common/modules/user/user.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
@Module({
	imports: [LibUserModule],
	controllers: [UserController],
})
export class UserModule {}
