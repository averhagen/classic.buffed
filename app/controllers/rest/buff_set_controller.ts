import { NextFunction, Request, Response } from "express";

export class BuffSetController {

    public async getBuffSet(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.buff_id);
        const selectedBuffs = req.query.buff_id;
        let output: String = "You've found the StatBuffer <br>";
        if(selectedBuffs) {
            if(Array.isArray(selectedBuffs)) {
                selectedBuffs as Array<any>;
                selectedBuffs.forEach(async (value) => {
                    output += value +"<br>";
                });
            }
        }
        res.send(output);
    }
}