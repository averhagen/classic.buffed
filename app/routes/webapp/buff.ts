import express = require('express');
import { WebAppBuffController } from '../../controllers/webapp/app.buff_controller'

const buffRouter = express.Router();
const webAppBuffController = new WebAppBuffController();

buffRouter.get('/', webAppBuffController.renderViewAllBuffsPage);

buffRouter.get('/create', webAppBuffController.renderCreateBuffPage);

buffRouter.get('/edit', webAppBuffController.renderEditBuffPage);
buffRouter.post('/edit', webAppBuffController.editBuff);

buffRouter.post('/delete', webAppBuffController.deleteBuff);

export { buffRouter };

