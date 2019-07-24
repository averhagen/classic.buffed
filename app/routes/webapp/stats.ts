import express = require('express');
import { WebAppStatController } from '../../controllers/webapp/app.stat_controller';

const statRouter = express.Router();
const statController = new WebAppStatController();

statRouter.get('/', statController.renderViewAllStatsPage);

export { statRouter };