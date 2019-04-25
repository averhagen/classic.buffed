import { Request, Response } from 'express';
import { BuffStatValue } from '../models/buff_stat_value';

export class BuffStatValueController {

    public addNewBuffStatValue(req: Request, res: Response) {
        const newStatValue = new BuffStatValue({
            buff: req.body["buff"],
            stat: req.body["stat"],
            value: req.body["value"]
        });
        newStatValue.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
    }

    public getBuffStatValue(req: Request, res: Response) {
        BuffStatValue.findOne().and([
            { buff: req.body["buff"] },
            { stat: req.body["stat"] }
        ]).populate('buff').populate('stat').exec((err, buffStatValue) => {
            if (err) {
                res.send(err);
            }
            res.json(buffStatValue);
        });
    }
}