import { Resource } from '@app/common';
import { ResourceService } from '@app/common/modules/resource/resource.service';
import { IUserRequest } from '@app/shared/interfaces';
import { ApiListResponseCustom } from '@app/shared/swagger';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('resources')
@ApiTags('Resource')
export class ResourceController {
	constructor(private readonly resourceService: ResourceService) {}

	@Post()
	@ApiListResponseCustom({
		summary: 'Generate resource',
		responseType: Resource,
    httpCode: 200
	})
	async create(@Req() req: IUserRequest) {
		return this.resourceService.create(req);
	}

  @Get()
  @ApiListResponseCustom({
		summary: 'DS resource',
		responseType: Resource,
    httpCode: 200
	})
  async findAll(){
    return this.resourceService.findAll()
  }
}
