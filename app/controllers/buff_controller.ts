import { Request, Response, NextFunction } from "express";
import { BuffModel } from "../models/buff";

export class BuffController {

    public async createBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff post request: " + req.url);
        const buffValues = this.extractBuffValuesFromReq(req);

        try {
            const buffDocument = await new BuffModel(buffValues).save();
            res.json(buffDocument);
        } catch (error) {
            res.send(error);
        }
    }

    private extractBuffValuesFromReq(req: Request): any {
        return {
            name: req.query["name"],
            rank: req.query["rank"]
        }
    }

    public async getBuffs(req: Request, res: Response) {
        console.log("Received buff get request: " + req.url);

        try {
            const foundBuffDocuments = await BuffModel.findOne(req.query).exec();
            res.json(foundBuffDocuments);
        } catch (error) {
            res.send(error);
        }
    }
}

