import { Router } from 'express';
import { WebappStatCategoryController } from '../../controllers/webapp/app.controller.stat_category'

const statCategoryRouter = Router();

const controller = new WebappStatCategoryController();

statCategoryRouter.get('/', controller.renderViewAllStatCategories);

statCategoryRouter.get('/create', controller.renderCreateStatCategory);
statCategoryRouter.post('/create', controller.createStatCategory);

export { statCategoryRouter };