import { Request, Response, NextFunction } from 'express';

export class WebappStatCategoryController {

    public renderCreateStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            res.render("stat_category/create_stat_category");
        } catch (error) {
            next(error);
        }
    }
}