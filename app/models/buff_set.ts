import { BuffStatValue } from "./buff_stat_value";
import { StatDocument } from "./stat";
import { StatDifferential } from "./stat_differential";

export class BuffSet {

    buff_ids: Set<String>;

    constructor() {
        this.buff_ids = new Set();
    }

    public addBuffByID(buff_id: String): boolean {
        this.buff_ids.add(buff_id);
        return this.buff_ids.has(buff_id);
    }

    public removeBuffByID(buff_id: String) {
        this.buff_ids.delete(buff_id);
        return this.buff_ids.has(buff_id);
    }

    public async getStatDifferentials(): Promise<Array<StatDifferential>> {
        const buffStatValues = await BuffStatValue.find({ buff: { $in: Array.from(this.buff_ids.values()) } }).populate("stat").exec();

        const statDiffMap: Map<StatDocument, StatDifferential> = new Map();

        for (let i = 0; i < buffStatValues.length; i++) {
            const currentBuffStatValue = buffStatValues[i];
            const currentStatDifferential = statDiffMap.get(currentBuffStatValue.stat);
            if (currentStatDifferential) {
                currentStatDifferential.difference += currentBuffStatValue.value;
            } else {
                const newStatDifferential: StatDifferential = {
                    stat: currentBuffStatValue.stat,
                    difference: currentBuffStatValue.value
                }
                statDiffMap.set(newStatDifferential.stat, newStatDifferential);
            }
        }
        return Array.from(statDiffMap.values());
    }

    public getBuffIDs(): Array<String> {
        return Array.from(this.buff_ids.values());
    }
}