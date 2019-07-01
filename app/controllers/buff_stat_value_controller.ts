import { Request, Response, NextFunction } from 'express';
import { BuffStatValue } from '../models/buff_stat_value';

export class BuffStatValueController {

    public async addNewBuffStatValue(req: Request, res: Response, next: NextFunction) {
        try {
            const valuesForNewBuffStatValue = {
                buff: req.query["buff"],
                stat: req.query["stat"],
                value: req.query["value"]
            };
            
            if (valuesForNewBuffStatValue.buff && valuesForNewBuffStatValue.stat && valuesForNewBuffStatValue.value) {
                const buffStatValueDoc = await new BuffStatValue(valuesForNewBuffStatValue).save();
                return res.json(buffStatValueDoc);
            }
            throw new Error("Unable to create BuffStatValue with given params.");
        } catch (error) {
            return next(error);
        }
    }

    public async getBuffStatValue(req: Request, res: Response, next: NextFunction) {
        console.log("Received getBuffStatValue request");
        try {
            if (req.query.buff && req.query.stat) {
                const foundDocument = await BuffStatValue.findOne(req.query).exec();
                if (foundDocument != null) {
                    return res.json(foundDocument.toJSON());
                }
            }

            throw new Error("Unable to find BuffStatValue with given parameters.");
        } catch (error) {
            return next(error);
        }
    }
}