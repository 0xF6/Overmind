import {profile} from '../../profiler/decorator';
import {Directive} from '../Directive';

@profile
export class DirectiveWall extends Directive {

	static directiveName = 'wall';
	static color = COLOR_GREY;
	static secondaryColor = COLOR_WHITE;

	constructor(flag: Flag) {
		super(flag);
	}

	spawnMoarOverlords() {
	}

	init(): void {
	}

	run(): void {
		if (this.colony.roomPlanner.shouldRecheck(2)) {
			this.colony.roomPlanner.barrierPlanner.refreshWallPositions();
			this.colony.roomPlanner.barrierPlanner.buildMissingWalls();
		}
	}

	visuals(): void {
		if (this.room) {
			this.room.visual.structure(this.pos.x, this.pos.y, STRUCTURE_WALL);
		}
	}
}

