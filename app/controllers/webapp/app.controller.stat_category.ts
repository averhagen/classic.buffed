import { Request, Response, NextFunction } from 'express';

export class WebappStatCategoryController {

    public renderCreateStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            res.render("stat_category/create_stat_category");
        } catch (error) {
            next(error);
        }
    }

    public createStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.name) {
                res.send("Created stat category : " + req.body.name);
            } else {    
                throw new Error("Invalid params to create stat category.");
            }
        } catch (error) {
            next(error);
        }
    }
}