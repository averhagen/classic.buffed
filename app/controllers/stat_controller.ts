import { Request, Response, NextFunction } from "express";
import { statModel } from "../models/stat";

export class StatController {

    public async createStat(req: Request, res: Response, next: NextFunction) {
        console.log("Received stat post request: " + req.url);

        try {
            const statDocument = await new statModel(req.query).save();
            return res.json(statDocument.toJSON());
        } catch (error) {
            return next(error);
        }
    }
}
