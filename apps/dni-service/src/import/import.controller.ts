import { ImportService } from '@app/common/modules/import/import.service';
import UploadFileInterceptor from '@app/shared/interceptors/upload-file.interceptor';
import { IUserRequest } from '@app/shared/interfaces';
import { ApiResponseCustom } from '@app/shared/swagger';
import {
	Body,
	Controller,
	HttpException,
	Post,
	Req,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('imports')
@ApiTags('Import')
export class ImportController {
	constructor(private readonly importService: ImportService) {}
	@Post()
	@UseInterceptors(
		UploadFileInterceptor({
			fieldName: 'file',
		}),
	)
	@ApiResponseCustom({ summary: 'Import data' })
	async importSingleFile(
		@Req() req: IUserRequest,
		@Body() payload,
		@UploadedFile() file: Express.Multer.File,
	) {
		payload.created_by_user = req.user;
		return await this.importService.importFile(payload, file);
	}
}
