import { Request, Response, NextFunction } from "express";
import { BuffModel } from "../../models/buff";

export class BuffController {

    public async createBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received buff post request: " + req.url);

        try {
            await new BuffModel(req.body).save();
            res.redirect('/buffs');
        } catch (error) {
            return next(error);
        }
    }

    public async editBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Recieved Buff edit REST request: " + req.url);
        try {
            const foundBuff = await BuffModel.findOne({ _id: req.query._id });
            if (foundBuff == null)
                throw new Error("Resource not found");

            if (req.query.rank) {
                foundBuff.rank = req.query.rank;
            }

            if (req.query.name) {
                foundBuff.name = req.query.name;
            }

            res.send(await foundBuff.save());
        } catch (error) {
            next(error);
        }
    }

    public async deleteBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received Buff delete request: " + req.url);
        try {
            const deleted = await BuffModel.findOneAndDelete({ _id: req.query._id }).exec();
            if (deleted == null)
                throw new Error("Buff not found");
            else
                res.send(deleted);
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
}

