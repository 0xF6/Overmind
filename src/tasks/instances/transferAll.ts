import {profile} from '../../profiler/decorator';
import {Task} from '../Task';


export type transferAllTargetType = StructureStorage | StructureTerminal | StructureContainer;

export const transferAllTaskName = 'transferAll';

@profile
export class TaskTransferAll extends Task {

	target: transferAllTargetType;
	data: {
		skipEnergy?: boolean;
	};

	constructor(target: transferAllTargetType, skipEnergy = false, options = {} as TaskOptions) {
		super(transferAllTaskName, target, options);
		this.data.skipEnergy = skipEnergy;
	}

	isValidTask() {
		for (const [resourceType, amount] of this.creep.carry.contents) {
			if (this.data.skipEnergy && resourceType == RESOURCE_ENERGY) {
				continue;
			}
			if (amount > 0) {
				return true;
			}
		}
		return false;
	}

	isValidTarget() {
		return _.sum(this.target.store) < this.target.storeCapacity;
	}

	work() {
		for (const [resourceType, amount] of this.creep.carry.contents) {
			if (this.data.skipEnergy && resourceType == RESOURCE_ENERGY) {
				continue;
			}
			if (amount > 0) {
				return this.creep.transfer(this.target, resourceType);
			}
		}
		return -1;
	}
}
