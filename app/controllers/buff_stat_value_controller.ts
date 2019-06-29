import { Request, Response, NextFunction } from 'express';
import { BuffStatValue } from '../models/buff_stat_value';

export class BuffStatValueController {

    public async addNewBuffStatValue(req: Request, res: Response, next: NextFunction) {
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
            const buffValue = req.params["buff"];
            const statValue = req.params["stat"];

            if (buffValue && statValue) {
                const query = { buff: buffValue, stat: statValue };
                const foundDocument = await BuffStatValue.findOne(query).exec();
                if (foundDocument != null) {
                    return res.json(foundDocument.toJSON());
                }
            }

            throw new Error("Unable to find document with given parameters.");
        } catch (error) {
            return next(error);
        }
    }
}