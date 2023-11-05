import { LibFormModule } from "@app/common/modules/form/form.module";
import { Module } from "@nestjs/common";
import { FormController } from "./form.controller";

@Module({
  imports : [LibFormModule],
  controllers : [FormController] 
})
export class FormModule {}