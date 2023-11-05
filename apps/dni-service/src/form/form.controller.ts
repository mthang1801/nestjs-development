import { Form, FormItem } from '@app/common';
import { CreateFormItemDto } from '@app/common/modules/form/dto/create-form-item.dto';
import { CreateFormDto } from '@app/common/modules/form/dto/create-form.dto';
import { FormItemFilterQueryDto } from '@app/common/modules/form/dto/filter-query-form-item.dto';
import { FormFilterQueryDto } from '@app/common/modules/form/dto/filter-query-form.dto';
import { UpdateFormItemDto } from '@app/common/modules/form/dto/update-form-item.dto';
import { UpdateFormStatusDto } from '@app/common/modules/form/dto/update-form-status.dto';
import { UpdateFormDto } from '@app/common/modules/form/dto/update-form.dto';
import { FormItemService } from '@app/common/modules/form/form-item.service';
import { FormService } from '@app/common/modules/form/form.service';
import { Public } from '@app/shared/decorators';
import {
  ApiCreatedResponseCustom,
  ApiListResponseCustom,
  ApiResponseCustom,
} from '@app/shared/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('forms')
@ApiTags('Biểu mẫu')
export class FormController {
	constructor(
		private readonly formService: FormService,
		private readonly formItemService: FormItemService,
	) {}

	@Post('items')
	@ApiCreatedResponseCustom({
		summary: 'Tạo form item',
		body: CreateFormItemDto,
		responseType: FormItem,
	})
	async createItem(@Body() createFormItemDto: CreateFormItemDto) {
		return this.formItemService.create(createFormItemDto);
	}

	@Get('items')
	@ApiListResponseCustom({ summary: 'DS Form Item', responseType: FormItem })
	async findAllItems(@Query() query: FormItemFilterQueryDto) {
		return this.formItemService.findAll(query);
	}

	@Put('items/:id')
	@ApiResponseCustom({ summary: 'Cập nhật form item' })
	async updateItem(
		@Param('id') id: string,
		@Body() updateFormItem: UpdateFormItemDto,
	) {
		return this.formItemService.update(id, updateFormItem);
	}

	@Delete('items/:id')
	@ApiResponseCustom({ summary: 'Xoá form item' })
	async deleteItem(@Param('id') id: string) {
		return this.formItemService.delete(id);
	}

	@Post()
	@ApiCreatedResponseCustom({ summary: 'Tạo biểu mẫu' })
	async create(@Body() createFormDto: CreateFormDto) {
		return this.formService.create(createFormDto);
	}

	@Get()
	@Public()
	@ApiListResponseCustom({ summary: 'DS Form', responseType: Form })
	async findAll(@Query() query: FormFilterQueryDto) {
		return this.formService.findAll(query);
	}

	@Get(':id')
	@ApiResponseCustom({ summary: 'Lấy Form theo id', responseType: Form })
	async findById(@Param('id') id: string) {
		return this.formService.findById(id);
	}

	@Put(':id')
	@ApiResponseCustom({ summary: 'Cập nhật form', body: UpdateFormDto })
	async update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
		return this.formService.update(id, updateFormDto);
	}

	@Put(':id/update-status')
	@ApiResponseCustom({
		summary: 'Cập nhật form status',
		body: UpdateFormStatusDto,
	})
	async updateStatus(
		@Param('id') id: string,
		@Body() updateFormStatusDto: UpdateFormStatusDto,
	) {
		return this.formService.updateStatus(id, updateFormStatusDto);
	}
}
