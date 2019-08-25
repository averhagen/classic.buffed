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

    public async editBuffCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.query._id;
            if (id) {
                const buffCategory = await BuffCategoryModel.findById(id);
                if (buffCategory) {
                    const newName = req.query.name;
                    if (newName) {
                        buffCategory.name = newName;
                    }
                    res.send(await buffCategory.save())
                } else {
                    res.status(404).send("Buff Category not found.");
                }
            } else {
                throw new Error("No buff category id provided");
            }
        } catch (error) {
            next(error);
        }
    }
}