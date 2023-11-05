import {
	endOfDay,
	lastDaysFromNow,
	startOfDay,
} from '@app/shared/utils/dates.utils';

export const lastTradeAtRange = ({
	last_trade_at_from,
	last_trade_at_to,
}: {
	last_trade_at_from: number;
	last_trade_at_to?: number;
}) => {
	return {
		from_date: startOfDay(
			last_trade_at_to
				? new Date(lastDaysFromNow(last_trade_at_to))
				: new Date(0),
		),
		to_date: endOfDay(new Date(lastDaysFromNow(last_trade_at_from))),
	};
};
