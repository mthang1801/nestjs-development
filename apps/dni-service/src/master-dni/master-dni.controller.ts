import { MasterDniService } from '@app/common/modules/master-dni/master-dni.service';
import { Public } from '@app/shared/decorators';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller('master-dni')
@ApiTags("Master DNI")
export class MasterDniController {
	constructor(private readonly masterDniService: MasterDniService) {}
	@Post('connect-exness')
	@Public()
	async connectExness() {
		return this.masterDniService.connectExness();
	}
}
