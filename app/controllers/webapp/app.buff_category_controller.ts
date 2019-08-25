import { NextFunction, Request, Response } from 'express';
import { BuffCategoryModel } from '../../models/buff_category';
import axios = require('axios');

export class WebAppBuffCategoryController {

    public async renderViewAllBuffCategoriesPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render View All Buff Categories requested.");
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buff_category/view_all_buff_categories.pug', { buff_categories: buffCategories });
    }

    public async renderCreateBuffCategoryPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render Create Buff Category page Requested.")
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buff_category/create_buff_category.pug', { buff_categories: buffCategories });
    }

    public async createBuffCategory(req: Request, res: Response, next: NextFunction) {
        console.log("Front end request to create buff category requested.");
        try {
            const params: any = {};
            params.name = req.body.name;
            res.send((await axios.default.post("http://localhost:3000/rest/buffcategory", null, { params })).data);
        } catch (error) {
            return next(error);
        }
    }
}