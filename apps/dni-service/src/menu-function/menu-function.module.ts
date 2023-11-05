import { LibMenuFunctionModule } from "@app/common/modules/menu-function/menu-function.module";
import { Module } from "@nestjs/common";
import { MenuFunctionController } from "./menu-function.controller";

@Module({
  imports: [LibMenuFunctionModule],
  controllers : [MenuFunctionController]
})
export class MenuFunctionModule {}