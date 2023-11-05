import { ClientService } from '@app/common/modules/client/client.service';
import { FormService } from '@app/common/modules/form/form.service';
import { GroupService } from '@app/common/modules/group/group.service';
import { MenuFunctionService } from '@app/common/modules/menu-function/menu-function.service';
import { ResourceService } from '@app/common/modules/resource/resource.service';
import { RoleService } from '@app/common/modules/role/role.service';
import { TradeAccountHistoryService } from '@app/common/modules/trade-account-history/trade-account-history.service';
import { TradeAccountService } from '@app/common/modules/trade-account/trade-account.service';
import { UserService } from '@app/common/modules/user/user.service';
import { AbstractType } from '@app/shared/abstract/types/abstract.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaveInfoService {
	constructor(
		private readonly clientService: ClientService,
		private readonly formService: FormService,
		private readonly userService: UserService,
		private readonly roleService: RoleService,
		private readonly menuFunctionService: MenuFunctionService,
		private readonly resourceService: ResourceService,
		private readonly groupService: GroupService,
		private readonly tradeAccountService: TradeAccountService,
		private readonly tradeAccountHistoryService: TradeAccountHistoryService,
	) {}

	async onSaveInfo({ id, modelName }: AbstractType.SaveInfoPayload) {
		switch (modelName) {
			case 'Client':
				return this.clientService._saveInfo(id);
			case 'Form':
				return this.formService._saveInfo(id);
			case 'User':
				return this.userService._saveInfo(id);
			case 'Role':
				return this.roleService._saveInfo(id);
			case 'MenuFunction':
				return this.menuFunctionService._saveInfo(id);
			case 'Resource':
				return this.resourceService._saveInfo(id);
			case 'Group':
				return this.groupService._saveInfo(id);
			case 'TradeAccount':
				return this.tradeAccountService._saveInfo(id);
			case 'TradeAccountHistory':
				return this.tradeAccountHistoryService._saveInfo(id);
		}
	}
}
