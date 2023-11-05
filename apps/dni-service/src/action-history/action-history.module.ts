import { LibActionHistoryModule, LibCoreModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ActionHistoryController } from './action-history.controller';

@Module({
  imports: [LibCoreModule, LibActionHistoryModule],
  controllers: [ActionHistoryController]
})
export class ActionHistoryModule {}
