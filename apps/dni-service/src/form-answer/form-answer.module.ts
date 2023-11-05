import { Module } from '@nestjs/common';
import { LibRoleModule } from '@app/common/modules/role/role.module';
import { LibFormAnswerModule } from '@app/common/modules/form-answer/form-answer.module';
import { FormAnswerController } from './form-answer.controller';

@Module({
	imports: [LibFormAnswerModule],
	controllers: [FormAnswerController],
})
export class FormAnswerModule {}
