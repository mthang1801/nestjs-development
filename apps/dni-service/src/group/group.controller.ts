import { CreateGroupDto } from '@app/common/modules/group/dto/create-group.dto';
import { GroupFilterQueryDto } from '@app/common/modules/group/dto/group-filter-query';
import { UpdateGroupStatusDto } from '@app/common/modules/group/dto/update-group-status.dto';
import { UpdateGroupDto } from '@app/common/modules/group/dto/update-group.dto';
import { GroupService } from '@app/common/modules/group/group.service';
import { Group } from '@app/common/schemas/group.schema';
import { IUserRequest } from '@app/shared/interfaces';
import { ApiResponseCustom } from '@app/shared/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('groups')
@ApiTags('Group')
export class GroupController {
	constructor(private readonly groupService: GroupService) {}

	@Post()
	@ApiResponseCustom({
		body: CreateGroupDto,
		summary: 'Tạo nhóm',
		responseType: Group,
	})
	async create(@Body() payload: CreateGroupDto) {
		return await this.groupService.create(payload);
	}

	@Get()
	@ApiResponseCustom({
		summary: 'Lấy danh sách nhóm',
	})
	async findAll(@Query() query: GroupFilterQueryDto) {
		return await this.groupService.findAll(query);
	}

	@Put(':id')
	@ApiResponseCustom({ summary: 'Cập nhật group' })
	async update(
		@Param('id') id: string,
		@Body() updateGroupDto: UpdateGroupDto,
	) {
		return await this.groupService.update(id, updateGroupDto);
	}

	@Put(':id/update-status')
	@ApiResponseCustom({ summary: 'Cập nhật status của group' })
	async updateStatus(
		@Param('id') id: string,
		@Body() updateGroupDto: UpdateGroupStatusDto,
	) {
		return await this.groupService.updateStatus(id, updateGroupDto);
	}

	@Delete(':id')
	@ApiResponseCustom({ summary: 'Xoá nhóm' })
	async delete(@Param('id') id: string, @Req() { user }: IUserRequest) {
		return await this.groupService.delete(id, user);
	}
}
