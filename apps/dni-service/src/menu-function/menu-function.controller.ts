import { CreateMenuFunctionDto } from '@app/common/modules/menu-function/dto/create-menu-function.dto';
import { FilterQueryMenuFunctionDto } from '@app/common/modules/menu-function/dto/filter-query-menu-function.dto';
import { UpdateMenuFunctionDto } from '@app/common/modules/menu-function/dto/update-menu-function.dto copy';
import { UpdateStatusMenuFunctionDto } from '@app/common/modules/menu-function/dto/update-status-menu-function.dto';
import { MenuFunctionService } from '@app/common/modules/menu-function/menu-function.service';
import { MenuFunction } from '@app/common/schemas/menu-function.schema';
import {
  ApiCreatedResponseCustom,
  ApiListResponseCustom,
  ApiResponseCustom,
} from '@app/shared/swagger';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('menu-functions')
@ApiTags('Menu Function')
export class MenuFunctionController {
	constructor(private readonly menuFunctionService: MenuFunctionService) {}

	@Post()
	@ApiCreatedResponseCustom({
		summary: 'Tạo menu function.',
		body: CreateMenuFunctionDto,
		responseType: MenuFunction,
	})
	async create(@Body() createMenuFunctionDto: CreateMenuFunctionDto) {
		return this.menuFunctionService.create(createMenuFunctionDto);
	}

	@Put(':id')
	@ApiResponseCustom({
		summary: 'Cập nhật menu function',
		body: UpdateMenuFunctionDto,
		responseType: MenuFunction,
	})
	async update(
		@Param('id') id: string,
		@Body() updateMenuFunctionDto: UpdateMenuFunctionDto,
	) {
		return this.menuFunctionService.update(id, updateMenuFunctionDto);
	}

	@Put('update-status/:id')
	@ApiResponseCustom({
		summary: 'Cập nhật status menu function',
		body: UpdateStatusMenuFunctionDto,
		responseType: MenuFunction,
	})
	async updateStatus(
		@Param('id') id: string,
		@Body() updateStatusMenuFunctionDto: UpdateStatusMenuFunctionDto,
	) {
		return this.menuFunctionService.updateStatus(
			id,
			updateStatusMenuFunctionDto,
		);
	}

	@Get()
	@ApiListResponseCustom({ summary: 'DS Menu', responseType: MenuFunction })
	async findAll(@Query() query: FilterQueryMenuFunctionDto) {
		return this.menuFunctionService.findAll(query);
	}

	@Get(':id')
	@ApiResponseCustom({
		summary: 'Cập nhật status menu function',
		responseType: MenuFunction,
	})
	async findById(@Param('id') id: string) {
		return this.menuFunctionService.findById(id);
	}
}
