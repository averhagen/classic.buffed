import { NextFunction, Request, Response } from 'express';
import { BuffCategoryModel } from '../../models/buff_category';

export class BuffCategoryController {

    public async getBuffCategory(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.query._id) {
                const buffCategory = await BuffCategoryModel.findOne({ _id: req.query._id }).exec();
                if (buffCategory) {
                    return res.send(buffCategory.toJSON());
                } else {
                    return res.json({});
                }
            } else {
                throw new Error("No Buff Category ID provided.");
            }
        } catch (error) {
            return next(error);
        }
    }

    public async createBuffCategory(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.query.name) {
                const createdBuff = await BuffCategoryModel.create({ name: req.query.name });
                res.send(createdBuff.toJSON());
            } else {
                throw new Error("Missing parameters to create Buff Category.");
            }
        } catch (error) {
            return next(error);
        }
    }
}