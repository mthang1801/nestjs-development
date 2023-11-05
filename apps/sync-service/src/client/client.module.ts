import { LibClientModule } from '@app/common/modules/client/client.module';
import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';

@Module({
	imports: [LibClientModule],
	controllers: [ClientController],
})
export class ClientModule {}
