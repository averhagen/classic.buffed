import { NextFunction, Request, Response } from "express";

export class BuffSetController {

    public async getBuffSet(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.selectedBuff);
        if(req.query.selectedBuff) {
            const selectedBuffs = req.query.selectedBuff;
            if(Array.isArray(selectedBuffs)) {
                selectedBuffs as Array<any>;
                selectedBuffs.forEach(async (value) => {
                    if(value instanceof String) {
                        value as String;
                    }
                });
            }
        }
        let output: String = "You've found the StatBuffer <br>";
        output = output + req.query.stats + "<br>";
        output = output + req.query.selectedBuffs.length;
        output += req.query.selectedBuffs + "<br>";
        output += req.query.selectedBuffs.length;
        const buffs = req.query.selectedBuffs;
        if(Array.isArray(buffs)) {
            
        }
        if(output)
        res.send(output);
    }
}