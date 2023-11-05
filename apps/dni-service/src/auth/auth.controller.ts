import { ActionHistoryService } from '@app/common/modules';
import { AuthService } from '@app/common/modules/auth/auth.service';
import { ForgetPasswordDto } from '@app/common/modules/auth/dto/forget-password.dto';
import { LoginDto } from '@app/common/modules/auth/dto/login.dto';
import { RestorePasswordDto } from '@app/common/modules/auth/dto/restore-password.dto';
import { SetPasswordDto } from '@app/common/modules/auth/dto/update-password.dto';
import { AuthResponseEntity } from '@app/common/modules/auth/entity/auth-response.entity';
import { LocalAuthGuard } from '@app/common/modules/auth/guards/local.guard';
import { Public } from '@app/shared/decorators';
import { IUserRequest } from '@app/shared/interfaces';
import { ApiResponseCustom } from '@app/shared/swagger';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly actionHistoryService: ActionHistoryService,
	) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@Public()
	@ApiResponseCustom({
		body: LoginDto,
		responseType: AuthResponseEntity,
		summary: 'Đăng nhập TK bằng email hoặc phone',
	})
	async login(@Req() req: IUserRequest): Promise<AuthResponseEntity> {
		const { user } = req;
		await this.actionHistoryService.saveLoginAction(user);
		return this.authService.responseLoginAccess(user);
	}

	@Post('set-password')
	@Public()
	@ApiResponseCustom({
		body: SetPasswordDto,
		summary: 'Set mật khẩu',
		httpCode: 200,
	})
	async setPassword(@Body() payload: SetPasswordDto) {
		await this.authService.setPassword(payload);
	}

	@Post('forget-password')
	@Public()
	@ApiResponseCustom({
		body: ForgetPasswordDto,
		summary: 'Quên mật khẩu (gửi email yêu cầu cập nhật lại)',
	})
	async forgetPassword(@Body() payload: ForgetPasswordDto) {
		return this.authService.forgetPassword(payload);
	}

	@Post('restore-password')
	@ApiResponseCustom({
		body: RestorePasswordDto,
		summary: 'Khôi phục mật khẩu từ yêu cầu quên mật khẩu',
	})
	@Public()
	async restorePassword(@Body() payload: RestorePasswordDto) {
		return this.authService.restorePassword(payload);
	}

	@Post('refresh-token')
	@ApiResponseCustom({
		httpCode: 200,
		responseType: AuthResponseEntity,
		summary:
			'Refresh Token (Sử dụng refresh token để yêu cầu cấp bộ token mới)',
	})
	@ApiHeader({
		name: 'authorization',
		description: 'Sử dụng refresh token để yêu cầu cấp bộ token mới',
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yjk1YzZlMmJmMTE5ZmNiZTY5ZTJiNyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjg5OTkwNjM5LCJleHAiOjE2OTA1OTU0Mzl9.rRibM51pKB4kTQwwLshdu9CbB3Gopy1AK9OqfjAd3Rk',
	})
	async refreshToken(@Req() req: IUserRequest) {
		const { user } = req;
		return this.authService.responseLoginAccess(user);
	}
}
