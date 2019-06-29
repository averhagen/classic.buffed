import { Request, Response, NextFunction } from 'express';
import { BuffStatValue } from '../models/buff_stat_value';

export class BuffStatValueController {

    public async addNewBuffStatValue(req: Request, res: Response) {
        const valuesForNewBuffStatValue = {
            buff: req.body["buff"],
            stat: req.body["stat"],
            value: req.body["value"]
        };

        try {
            const buffStatValueDoc = await new BuffStatValue(valuesForNewBuffStatValue).save();
            res.json(buffStatValueDoc);
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }

    public async getBuffStatValue(req: Request, res: Response, next: NextFunction) {
        console.log("Received getBuffStatValue request");
        try {
            const query = { buff: req.params["buff"], stat: req.params["stat"] };
            const foundDocument = await BuffStatValue.findOne(query).exec();
            if (foundDocument != null) {
                res.json(foundDocument.toJSON());
            } else {
                throw new Error("Unable to find document with those params.");
            }
        } catch (error) {
            next(error);
            console.log(error);
        }
        console.log("Sent getBuffStatValue response");
    }
}