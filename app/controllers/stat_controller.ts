import { Request, Response } from "express";
import { statModel } from "../models/stat";

export class StatController {

    public extractModelValuesFromReq(req: Request) {
        return {
            name: req.query["name"]
        };
    }

    public async createStat(req: Request, res: Response) {
        console.log("Received stat post request: " + req.url);
        const statValues = this.extractModelValuesFromReq(req);

        try {
            const statDocument = await new statModel(statValues).save();
            res.json(statDocument);
        } catch (error) {
            res.send(error);
        }
    }
}
