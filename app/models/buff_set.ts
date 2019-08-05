import { BuffDocument } from "./buff";
import { StatDifferential } from "./stat_differential";

export class BuffSet {

    buffs: Set<BuffDocument>;

    constructor() {
        this.buffs = new Set();
    }

    public addBuff(buff: BuffDocument): boolean {
        return false;
    }

    public addBuffByID(buff_id: String): boolean {
        return false;
    }

    public removeBuff(buff: BuffDocument): boolean {
        return false;
    }

    public removeBuffByID(buff_id: String): boolean {
        return false;
    }

    public getStatDifferentials(): Array<StatDifferential> {
        return new Array<any>();
    }
}