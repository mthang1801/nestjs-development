import { AssignRoleDto } from '@app/common/modules/role/dto/assign-role.dto';
import { CreateRoleDto } from '@app/common/modules/role/dto/create-role.dto';
import { RoleFilterQueryDto } from '@app/common/modules/role/dto/role-filter-query.dto';
import { UpdateRoleStatusDto } from '@app/common/modules/role/dto/update-role-status.dto';
import { UpdateRoleDto } from '@app/common/modules/role/dto/update-role.dto';
import { RoleService } from '@app/common/modules/role/role.service';
import { Role } from '@app/common/schemas/role.schema';
import { Public } from '@app/shared/decorators';
import { ApiResponseCustom } from '@app/shared/swagger';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('roles')
@ApiTags('Role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	@ApiResponseCustom({
		body: CreateRoleDto,
		summary: 'Tạo vai trò',
		responseType: Role,
	})
	async create(@Body() payload: CreateRoleDto) {
		return await this.roleService.create(payload);
	}

	@Get()
	@ApiResponseCustom({
		summary: 'Lấy danh sách vai trò',
	})
  @Public()
	async findAll(@Query() query: RoleFilterQueryDto) {
		return await this.roleService.findAll(query);
	}

	@Put(':id')
	@ApiResponseCustom({ summary: 'Cập nhật role' })
	async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return await this.roleService.update(id, updateRoleDto);
	}

	@Put(':id/update-status')
	@ApiResponseCustom({ summary: 'Cập nhật status role' })
	async updateStatus(
		@Param('id') id: string,
		@Body() updateRoleDto: UpdateRoleStatusDto,
	) {
		return await this.roleService.updateStatus(id, updateRoleDto);
	}

	@Post('assign-users')
	async asssignUser(@Body() assignRoleDto: AssignRoleDto) {
		await this.roleService.assignRole(assignRoleDto);
	}
}
