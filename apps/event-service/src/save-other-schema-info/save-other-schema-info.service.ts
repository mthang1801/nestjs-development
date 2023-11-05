import { ClientService } from '@app/common/modules/client/client.service';
import { FormService } from '@app/common/modules/form/form.service';
import { GroupService } from '@app/common/modules/group/group.service';
import { MenuFunctionService } from '@app/common/modules/menu-function/menu-function.service';
import { ResourceService } from '@app/common/modules/resource/resource.service';
import { RoleService } from '@app/common/modules/role/role.service';
import { TradeAccountHistoryService } from '@app/common/modules/trade-account-history/trade-account-history.service';
import { TradeAccountService } from '@app/common/modules/trade-account/trade-account.service';
import { UserService } from '@app/common/modules/user/user.service';
import { ENUM_MODEL, MAPPING_REFERENCE_MODEL } from '@app/shared';
import { AbstractType } from '@app/shared/abstract/types/abstract.type';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SaveOtherSchemaInfoService {
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

	async onSaveOtherSchemaInfo({
		payload,
		modelName,
	}: AbstractType.SaveOtherSchemaInfoPayload<any>) {
		try {
			const refModelList = this.getRefModelListByModelName(modelName);
			return await Promise.allSettled(
				refModelList
					.filter(Boolean)
					.map(async (refModel: keyof typeof ENUM_MODEL) => {
						return this.getServiceByModelName(refModel)?._saveOtherSchemaInfo(
							payload,
							modelName,
						);
					}),
			);
		} catch (error) {
			console.log(error.stack);
		}
	}

	getRefModelListByModelName(modelName: keyof typeof ENUM_MODEL) {
		return Object.entries(MAPPING_REFERENCE_MODEL).reduce(
			(result, [key, val]: any) => {
				if (val.includes(modelName as any)) {
					result.push(key);
				}
				return result;
			},
			[],
		);
	}

	getServiceByModelName(modelName: keyof typeof ENUM_MODEL) {
		switch (modelName) {
			case 'Client':
				return this.clientService;
			case 'Form':
				return this.formService;
			case 'User':
				return this.userService;
			case 'Role':
				return this.roleService;
			case 'MenuFunction':
				return this.menuFunctionService;
			case 'Resource':
				return this.resourceService;
			case 'Group':
				return this.groupService;
			case 'TradeAccount':
				return this.tradeAccountService;
			case 'TradeAccountHistory':
				return this.tradeAccountHistoryService;
		}
	}

	async onSaveOtherSchemaInfoForUpdateMany({
		filterQuery,
		modelName,
	}: AbstractType.SaveOtherSchemaInfoUpdateManyPayload<any>) {
		return this.getServiceByModelName(
			modelName,
		)._saveOtherSchemaInfoForUpdateMany(filterQuery);
	}
}
