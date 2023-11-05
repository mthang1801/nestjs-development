import { AuthGuard } from '@app/common/modules/auth/guards/auth.guard';
import { CreateUserDto } from '@app/common/modules/user/dto/create-user.dto';
import { UserFilterQueryDto } from '@app/common/modules/user/dto/filter-query-user.dto';
import { UpdateUserDto } from '@app/common/modules/user/dto/udpate-user.dto';
import { UpdateStatusUserDto } from '@app/common/modules/user/dto/update-status-user.dto';
import { UserService } from '@app/common/modules/user/user.service';
import { User } from '@app/common/schemas';
import { MongooseClassSerialzierInterceptor } from '@app/shared';
import { Public } from '@app/shared/decorators';
import { IUserRequest } from '@app/shared/interfaces';
import {
  ApiCreatedResponseCustom,
  ApiListResponseCustom,
  ApiResponseCustom,
} from '@app/shared/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@Controller('users')
@ApiTags('Người dùng')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseInterceptors(MongooseClassSerialzierInterceptor(User))
	@ApiCreatedResponseCustom({
		responseType: User,
		body: CreateUserDto,
		summary: 'Tạo người dùng',
	})
	@UseGuards(AuthGuard)
	@Public()
	async create(@Body() payload: CreateUserDto) {
		return this.userService.create(payload);
	}

	@Get()
	@UseInterceptors(MongooseClassSerialzierInterceptor(User))
	@ApiListResponseCustom({
		responseType: User,
		summary: 'Lấy danh sách',
	})
	async getList(@Query() query: UserFilterQueryDto) {
		return await this.userService.getList(query);
	}

	@ApiResponseCustom({
		responseType: User,
		summary: 'Lấy thông tin người dùng hiện tại',
	})
	@Get('profile')
	async getInfo(@Req() req: IUserRequest) {
		return req.user;
	}

	@Get(':id')
	@ApiResponseCustom({ summary: 'Chi tiết user', responseType: User })
	async findById(@Param('id') id: string) {
		return this.userService.findById(id);
	}

	@Put(':id')
	@ApiResponseCustom({
		summary: 'Cập nhật theo id',
		body: UpdateUserDto,
	})
	async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Put(':id/update-status')
	@ApiResponseCustom({
		summary: 'Cập nhật status theo id',
		body: UpdateStatusUserDto,
	})
	async updateStatus(
		@Param('id') id: string,
		@Body() updateStatusUserDto: UpdateStatusUserDto,
	) {
		return this.userService.updateStatus(id, updateStatusUserDto);
	}
}
