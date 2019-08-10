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
                    throw new Error("No buff with ID:" + req.query._id + " found.");
                }
            } else {
                throw new Error("No Buff Category ID provided.");
            }
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }
}