import { Request, Response, NextFunction } from "express";
import { statModel } from "../../models/stat";

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

    public async editStat(req: Request, res: Response, next: NextFunction) {
        console.log("Received edit stat REST request.");
    }

    public async deleteStat(req: Request, res: Response, next: NextFunction) {
        console.log("Received stat request: " + req.url);

        try {
            const deleted = await statModel.findOneAndDelete({ _id: req.query._id }).exec();
            if (deleted == null)
                throw new Error("Stat not found");
            else
                res.send(deleted);
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
}
