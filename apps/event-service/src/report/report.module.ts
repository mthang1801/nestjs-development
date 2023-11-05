import { LibReportModule } from "@app/common/modules/report";
import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";

@Module({
  imports: [LibReportModule],
  controllers: [ReportController]
})
export class ReportModule {}
