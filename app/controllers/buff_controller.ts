import { Request, Response, NextFunction } from "express";
import { BuffModel } from "../models/buff";

export class BuffController {

    public async createBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff post request: " + req.url);

        try {
            const buffDocument = await new BuffModel(req.query).save();
            return res.json(buffDocument.toJSON());
        } catch (error) {
            return next(error);
        }
    }

    public async getBuffs(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff get request: " + req.url);

        try {
            if (req.query.name && req.query.rank) {
                const foundBuffDocuments = await BuffModel.findOne(req.query).exec();
                if (foundBuffDocuments != null) {
                    return res.json(foundBuffDocuments.toJSON());
                }
            }
            throw new Error("Unable to find Buff with given params.");
        } catch (error) {
            return next(error);
        }
    }

    public async renderViewAllBuffsPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render All Buffs Requested.");
        const buffs = await BuffModel.find().exec();
        res.render('buffs/view_all_buffs', { buffs: buffs });
    }

    public async renderCreateBuffPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render Create Buff Page Requested.");
        res.render('buffs/create_buff.pug');
    }
}

