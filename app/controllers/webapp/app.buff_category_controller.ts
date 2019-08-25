import { NextFunction, Request, Response } from 'express';
import { BuffCategoryModel } from '../../models/buff_category';
import axios = require('axios');

export class WebAppBuffCategoryController {

    public async renderEditBuffCategoryPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render Edit Buff Category Page");
        const buffCategoryId = req.query._id;
        try {
            if (buffCategoryId) {
                const buffCategory = await BuffCategoryModel.findById(buffCategoryId).exec();
                if (buffCategory) {
                    return res.render("buff_category/edit_buff_category.pug", { buff_category: buffCategory });
                }
            }
        } catch (error) {
            next(error);
        }
        return res.redirect("/buffcategory");
    }

    public async renderViewAllBuffCategoriesPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render View All Buff Categories Page");
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buff_category/view_all_buff_categories.pug', { buff_categories: buffCategories });
    }

    public async renderCreateBuffCategoryPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render Create Buff Category Page")
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buff_category/create_buff_category.pug', { buff_categories: buffCategories });
    }

    public async createBuffCategory(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Create Buff Category");
        try {
            const params: any = {};
            params.name = req.body.name;
            res.send((await axios.default.post("http://localhost:3000/rest/buffcategory", null, { params })).data);
        } catch (error) {
            return next(error);
        }
    }

    public async editBuffCategory(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Edit Buff Category");
        try {
            const id = req.body._id;
            if (id) {
                const params: any = { _id: id };
                params.name = req.body.name;
                await axios.default.put("http://localhost:3000/rest/buffcategory", null, { params });
                res.redirect("/buffcategory");
            } else {
                throw new Error("No id provided.");
            }
        } catch (error) {
            next(error);
        }
    }

    public async deleteBuffCategory(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Delete Buff Category");
        try {
            const buffCategoryId = req.body._id;
            if (buffCategoryId) {
                await BuffCategoryModel.findByIdAndDelete(buffCategoryId);
            }
        } catch (error) {
            next(error);
        }
        res.redirect('/buffcategory');
    }
}