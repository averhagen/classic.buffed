import mongoose = require('mongoose');
import { Request, Response } from "express";
import { BuffModel } from "../models/buff";

export class BuffController {

    public async createBuff(req: Request, res: Response) {
        console.log("Received buff post request: " + req.url);
        const buffValues = this.extractBuffValuesFromReq(req);

        try {
            const buffDocument = await new BuffModel(buffValues);
            res.json(buffDocument);
        } catch (error) {
            res.send(error);
        }
    }

    private extractBuffValuesFromReq(req: Request): any {
        return {
            name: req.query["name"],
            rank: req.query["rank"]
        }
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

