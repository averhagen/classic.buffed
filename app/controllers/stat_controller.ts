import mongoose = require("mongoose");
import { Request, Response } from "express";
import { statSchema } from "../models/stat";

const StatModel = mongoose.model('stat', statSchema);

export class StatController {

    public addNewStat(req: Request, res: Response) {
        const newStat = new StatModel({ name: req.query["name"] });
        newStat.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        })
    }
}
