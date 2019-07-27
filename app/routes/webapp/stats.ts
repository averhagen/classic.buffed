import express = require('express');
import { WebAppStatController } from '../../controllers/webapp/app.stat_controller';

const statRouter = express.Router();
const statController = new WebAppStatController();

statRouter.get('/', statController.renderViewAllStatsPage);
statRouter.get('/create', statController.renderCreateStatView);
statRouter.post('/create', statController.createStat);

export { statRouter };