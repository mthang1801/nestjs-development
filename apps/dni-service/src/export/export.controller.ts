import { CreateExportFileDto } from '@app/common/modules/export/dto/create-export.dto';
import { DeleteExportFileDto } from '@app/common/modules/export/dto/delete-export-file.dto copy';
import { DownloadExportFileDto } from '@app/common/modules/export/dto/download-export-file.dto';
import { ExportFilePartDto } from '@app/common/modules/export/dto/export-file-part.dto';
import { ImplementExportDto } from '@app/common/modules/export/dto/implement-export.dto';
import { ResponseExportDto } from '@app/common/modules/export/dto/response-export.dto';
import { ExportService } from '@app/common/modules/export/export.service';
import { ENUM_EVENT_PATTERN, RMQClientService } from '@app/shared';
import { Public } from '@app/shared/decorators';
import {
	ApiCreatedResponseCustom,
	ApiResponseCustom,
} from '@app/shared/swagger';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Req,
	Res,
	Sse,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Observable } from 'rxjs';

@Controller('exports')
@ApiTags('Export')
export class ExportController {
	constructor(
		private readonly exportService: ExportService,
		private readonly rmqService: RMQClientService,
	) {}

	@Post('download')
	@ApiResponseCustom({
		summary: 'Download file',
		body: DownloadExportFileDto,
		httpCode: 200,
	})
	async getFile(@Body('file_path') filePath: string, @Res() res: Response) {
		return res.download(filePath);
	}

	@Post('delete')
	@ApiResponseCustom({
		summary: 'Xoá file',
		body: DeleteExportFileDto,
		httpCode: 200,
	})
	async deleteFile(@Body('file_path') filePath: string) {
		return this.exportService.deleteFile(filePath);
	}

	@Post()
	@ApiResponseCustom({
		summary: 'Tạo export file',
		body: CreateExportFileDto,
		responseType: ResponseExportDto,
		httpCode: 200,
	})
	create(@Body() payload: CreateExportFileDto, @Req() { user }) {
		return this.exportService.create(payload, user);
	}

	@Public()
	@Get('/:module/:session/:part')
	async getExportFile(
		@Param('module') module: string,
		@Param('session') session: string,
		@Param('part') part: number,
		@Res() res: Response,
	) {
		const filePath = this.exportService.getExportFile(module, session, part);
		res.set({
			'Content-Type': 'application/vnd.ms-excel',
			'Content-Disposition': 'attachment; filename="response.xlsx"',
		});

		return res.download(filePath);
	}

	@Delete('/:module/:session/:part')
	async deleteExportFile(
		@Param('module') module: string,
		@Param('session') session: string,
		@Param('part') part: number,
	) {
		await this.exportService.deleteExportFile(module, session, part);
	}

	@Sse('listener/:module/:session/:part')
	exportListener(
		@Param('module') module: string,
		@Param('session') session: string,
		@Param('part') part: number,
	): Observable<any> {
		return this.exportService.exportProcessListener(module, session, part);
	}

	@Post('session')
	async createExportSession(
		@Body() payload: CreateExportFileDto,
		@Req() { user },
	) {
		return this.exportService.createExportSession(payload);
	}

	@Post('implement')
	implementExport(@Body() payload: ImplementExportDto, @Req() { user }) {
		return this.exportService.implementExport(payload, user);
	}

	@EventPattern(ENUM_EVENT_PATTERN.EXPORT)
	async onExportPart(
		@Payload() payload: ExportFilePartDto,
		@Ctx() ctx: RmqContext,
	) {
		await this.exportService.onExportPart(payload);
		this.rmqService.ack(ctx);
	}
}
