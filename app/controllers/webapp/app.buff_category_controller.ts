import { Request, Response, NextFunction } from 'express';
import { BuffCategoryModel } from '../../models/buff_category';

export class WebAppBuffCategoryController {

    public async renderCreateBuffCategoryPage(req: Request, res: Response, next: NextFunction) {
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buff_category/create_buff_category.pug', { buff_categories: buffCategories });
    }
}