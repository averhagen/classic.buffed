import { NextFunction, Response, Request } from 'express';
import { StatCategoryModel } from '../../models/stat_category';

export class RestControllerStatCategory {

    public async createStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const nameParam = req.query.name;
            if (nameParam) {
                const createdStat = await new StatCategoryModel({ name: nameParam }).save();
                res.json(createdStat);
            } else {
                throw new Error("Missing parameters to create Stat Category");
            }
        } catch (error) {
            return next(error);
        }
    }

    public async deleteStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const idParam = req.query._id;
            if (idParam) {
                const deletedStatCategory = StatCategoryModel.findOneAndDelete({ _id: idParam });
                if (deletedStatCategory == null) {
                    throw new Error("Stat Category not found with id: " + idParam);
                } else {
                    res.send(deletedStatCategory);
                }
            }
        } catch (error) {
            next(error);
        }
    }
}