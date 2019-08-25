import { Request, Response, NextFunction } from 'express';
import axios = require('axios');
import { StatCategoryModel } from '../../models/stat_category';

export class WebappStatCategoryController {

    public renderCreateStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            res.render("stat_category/create_stat_category");
        } catch (error) {
            next(error);
        }
    }

    public async createStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.name) {
                const params: any = {};
                params.name = req.body.name;
                await axios.default.post("http://localhost:3000/rest/statcategory", null, { params });
                res.redirect("/statcategory");
            } else {
                throw new Error("Invalid params to create stat category.");
            }
        } catch (error) {
            next(error);
        }
    }

    public async renderViewAllStatCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await StatCategoryModel.find().exec();
            res.render("stat_category/view_all_stat_categories", { stat_categories: categories });
        } catch (error) {
            next(error);
        }
    }

    public async deleteStatCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const idParam = req.body._id;
            if (idParam) {
                const params: any = { _id: idParam };
                await axios.default.delete("http://localhost:3000/rest/statcategory", { params });
                res.redirect("/statcategory");
            } else {
                throw new Error("No id param provided");
            }
        } catch (error) {
            next(error);
        }
    }
}