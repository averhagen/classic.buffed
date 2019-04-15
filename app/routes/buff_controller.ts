import mongoose = require('mongoose');
import { Request, Response } from "express";
import { buffSchema } from "../models/buff";

const Buff = mongoose.model('buff', buffSchema);

export class BuffController {

    public addNewBuff(req: Request, res: Response) {
        console.log("Received buff post request: " + req.url);
        const newBuff = new Buff({ name: req.query["name"], rank: req.query["rank"] });
        newBuff.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getBuffs(req: Request, res: Response) {
        console.log("Received buff get request: " + req.url);
        Buff.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
}

