import express = require('express');
import { BuffController } from '../controllers/buff_controller';

const buffRouter = express.Router();
const buffController = new BuffController();

buffRouter.get('/', buffController.renderViewAllBuffsPage);
buffRouter.get('/create', buffController.renderCreateBuffPage);

export { buffRouter };