import { Router } from 'express';
import { WebAppBuffCategoryController } from '../../controllers/webapp/app.buff_category_controller';


const buffCategoryRouter = Router();
const webAppBuffCategoryController = new WebAppBuffCategoryController();

buffCategoryRouter.get('/create', webAppBuffCategoryController.renderCreateBuffCategoryPage);

export { buffCategoryRouter } 