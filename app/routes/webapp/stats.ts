import express = require('express');
import { WebAppStatController } from '../../controllers/webapp/app.stat_controller';

const statRouter = express.Router();
const statController = new WebAppStatController();

statRouter.get('/', statController.renderViewAllStatsPage);

statRouter.get('/create', statController.renderCreateStatView);
statRouter.post('/create', statController.createStat);

statRouter.get('/edit', statController.renderEditStatView);
statRouter.post('/edit', statController.editStat);

statRouter.post('/delete', statController.deleteStat);


export { statRouter };