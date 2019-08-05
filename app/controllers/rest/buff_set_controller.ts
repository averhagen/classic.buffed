import { NextFunction, Request, Response } from "express";
import { BuffSet } from "../../models/buff_set";

export class BuffSetController {

    public async getBuffSet(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.buff_id);
        const selectedBuffs = req.query.buff_id;

        try {
            if (selectedBuffs) {
                const buffSet = new BuffSet();
                if (Array.isArray(selectedBuffs)) {
                    selectedBuffs as Array<any>;
                    selectedBuffs.forEach(async (buff_id) => {
                        buffSet.addBuffByID(buff_id);
                    });
                }
                return res.send(buffSet.getStatDifferentials());
            } else {
                throw new Error("Invalid input");
            }
        } catch (error) {
            next(error);
        }
    }
}