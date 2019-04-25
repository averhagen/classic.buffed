import mongoose = require('mongoose');
import { Request, Response } from "express";
import { BuffModel } from "../models/buff";

export class BuffController {

    public createBuff(req: Request, res: Response) {
        console.log("Received buff post request: " + req.url);
        const newBuff = new BuffModel({ name: req.query["name"], rank: req.query["rank"] });
        newBuff.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getBuffs(req: Request, res: Response) {
        console.log("Received buff get request: " + req.url);
        BuffModel.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
}

