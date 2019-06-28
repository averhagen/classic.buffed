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
            const foundDocument = await BuffStatValue.findOne().and([
                { buff: req.body["buff"], stat: req.body["stat"] }
            ]).exec();
            if(foundDocument != null) {
                res.json(foundDocument.toJSON());
            }
        } catch (error) {
            console.log(error);
        }
        // BuffStatValue.findOne().and([
        //     { buff: req.body["buff"] },
        //     { stat: req.body["stat"] }
        // ]).populate('buff').populate('stat').exec((err, buffStatValue) => {
        //     if (err) {
        //         console.log(err);
        //         res.send(err);
        //     }
        //     res.json(buffStatValue);
        // });
    }
}