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
}