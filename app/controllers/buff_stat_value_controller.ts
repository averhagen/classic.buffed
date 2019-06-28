import { Request, Response } from 'express';
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

    public async getBuffStatValue(req: Request, res: Response) {
        try {
            const query = { buff: req.body["buff"], stat: req.body["stat"] };
            const foundDocument = await BuffStatValue.findOne(query).exec();
            if (foundDocument != null) {
                res.json(foundDocument.toJSON());
            }
        } catch (error) {
            console.log(error);
        }
    }
}