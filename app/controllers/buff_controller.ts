import { Request, Response, NextFunction } from "express";
import { BuffModel } from "../models/buff";

export class BuffController {

    public async createBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff post request: " + req.url);

        try {
            const buffDocument = await new BuffModel(req.query).save();
            return res.json(buffDocument);
        } catch (error) {
            return next(error);
        }
    }

    public async getBuffs(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff get request: " + req.url);

        try {
            const foundBuffDocuments = await BuffModel.findOne(req.query).exec();
            return res.json(foundBuffDocuments);
        } catch (error) {
            return next(error);
        }
    }
}

