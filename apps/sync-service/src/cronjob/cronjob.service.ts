import { ClientService } from '@app/common/modules/client/client.service';
import {
	CommonConfig,
	ENUM_EVENT_PATTERN,
	ENUM_QUEUES,
	RMQClientService,
} from '@app/shared';
import { CommonConfigType } from '@app/shared/config/types';
import { UtilService } from '@app/shared/utils/util.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { lastTradeAtRange } from './helper/last-trade-at-range.helper';
@Injectable()
export class CronjobService {
	logger = new Logger(CronjobService.name);
	constructor(
		private readonly clientService: ClientService,
		private readonly RMQClientService: RMQClientService,
		private readonly utilService: UtilService,
		private readonly rmqService: RMQClientService,
	) {}

	/**
	 * Sync client everyday
	 */
	@Cron('0 0 */12 * * *', {
		name: 'SYNC_CLIENT_EVERY_DAY',
		timeZone: 'Asia/Ho_Chi_Minh',
	})
	async syncClientAccount() {
		this.logger.log(
			'**************** syncClientAccount EVERY DAY ******************',
		);

		await this.findClientByApplyTime('DAY');

		this.rmqService.publishDataToQueue(
			ENUM_QUEUES.TELEGRAM,
			ENUM_EVENT_PATTERN.TELEGRAM_MESSAGE,
			{ message: `[SCHEDULER SYNC CLIENT EVERY DAY] Sync Client records` },
		);
	}

	@Cron(CronExpression.EVERY_WEEK, {
		name: 'SYNC_CLIENT_EVERY_WEEK',
		timeZone: 'Asia/Ho_Chi_Minh',
	})
	async syncClientAccountEveryWeek() {
		this.logger.log(
			'**************** syncClientAccount EVERY_WEEK ******************',
		);

		await this.findClientByApplyTime('WEEK');

		this.rmqService.publishDataToQueue(
			ENUM_QUEUES.TELEGRAM,
			ENUM_EVENT_PATTERN.TELEGRAM_MESSAGE,
			{ message: `[SCHEDULER SYNC CLIENT EVERY WEEK] Sync Client records` },
		);
	}

	@Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT, {
		name: 'SYNC_CLIENT_EVERY_MONTH',
		timeZone: 'Asia/Ho_Chi_Minh',
	})
	async syncClientAccountEveryMonth() {
		this.logger.log(
			'**************** syncClientAccount EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT ******************',
		);

		await this.findClientByApplyTime('MONTH');

		this.rmqService.publishDataToQueue(
			ENUM_QUEUES.TELEGRAM,
			ENUM_EVENT_PATTERN.TELEGRAM_MESSAGE,
			{ message: `[SCHEDULER SYNC CLIENT EVERY MONTH] Sync Client records` },
		);
	}

	async findClientByApplyTime(
		applyTime: Exclude<CommonConfigType.ApplyTime, 'YEAR'>,
	) {
		this.logger.log('************ findClientByApplyTime ***********');

		const clientScheduler = CommonConfig.syncClientScheduler(applyTime);

		const { from_date, to_date } = lastTradeAtRange(clientScheduler);

		const clientList = await this.clientService.readModel
			.find(
				{
					$or: [
						{
							last_trade_at: this.utilService.filterBetweenDate(
								from_date,
								to_date,
							),
						},
						applyTime === 'WEEK'
							? {
									last_trade_at: null,
							  }
							: null,
						{
							last_sync_at: null,
						},
					].filter(Boolean),
				},
				{},
			)
			.allowDiskUse(true)
			.select('name email affiliation code phone gender');

		this.rmqService.publishDataToQueue(
			ENUM_QUEUES.TELEGRAM,
			ENUM_EVENT_PATTERN.TELEGRAM_MESSAGE,
			{ message: `Đang tiến hành đồng bộ ${clientList.length} clients` },
		);

		clientList.forEach((client) => {
			this.RMQClientService.publishDataToQueue(
				'SYNC_CLIENT_ACCOUNT',
				ENUM_EVENT_PATTERN.SYNC_CLIENT_ACCOUNT,
				{
					client,
				},
			);
		});
	}
}
