import express = require('express');
import { BuffController } from '../controllers/buff_controller';
import { WebAppBuffController } from '../controllers/app.buff_controller'

const buffRouter = express.Router();
const buffController = new BuffController();
const webAppBuffController = new WebAppBuffController();

buffRouter.get('/', buffController.renderViewAllBuffsPage);
buffRouter.get('/create', buffController.renderCreateBuffPage);
buffRouter.post('/delete', webAppBuffController.deleteBuff);

export { buffRouter };

