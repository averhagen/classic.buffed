import { BuffDocument, BuffModel } from "./buff";
import { StatDifferential } from "./stat_differential";

export class BuffSet {

    buffs: Set<BuffDocument>;
    buff_ids: Array<String>;

    constructor() {
        this.buffs = new Set();
        this.buff_ids = new Array();
    }

    public addBuff(buff: BuffDocument): boolean {
        this.buffs.add(buff);
        this.buff_ids.push(buff._id);
        return true;
    }

    public async addBuffByID(buff_id: String) {
        const buff = await BuffModel.findOne({ _id: buff_id }).exec();
        if (buff) {
            this.addBuff(buff);
        } else {
            throw new Error("Invalid buff_id: " + buff_id);
        }
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

    public getBuffIDs(): Array<String> {
        return this.buff_ids;
    }
}