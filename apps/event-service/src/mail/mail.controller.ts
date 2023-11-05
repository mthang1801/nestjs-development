import { SetPasswordDto } from '@app/common/modules/auth/dto/update-password.dto';
import { ENUM_EVENT_PATTERN } from '@app/shared';
import { SendMailForgetPasswordDto } from '@app/shared/mail/dto/forget-password.dto';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailDataRequired } from '@sendgrid/mail';
import { MailService } from './mail.service';
@Controller()
export class MailController {
	logger = new Logger(MailController.name);
	constructor(private readonly mailService: MailService) {}
  
	@EventPattern(ENUM_EVENT_PATTERN.SET_PASSWORD)
	async onSetPassword(@Payload() payload: SetPasswordDto) {
		this.logger.log(`${'*'.repeat(20)} onSetPassword() ${'*'.repeat(20)}`);
		return await this.mailService.onSetPassword(payload);
	}

	@EventPattern(ENUM_EVENT_PATTERN.RESET_PASSWORD)
	async onResetPassword(@Payload() payload: SendMailForgetPasswordDto) {
		return await this.mailService.onResetPassword(payload);
	}

	@EventPattern(ENUM_EVENT_PATTERN.SEND_EMAIL)
	async onSendEmail(@Payload() payload: MailDataRequired) {
		return await this.mailService.onSendEmail(payload);
	}
}
