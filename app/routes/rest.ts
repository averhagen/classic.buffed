import express = require('express');
import { BuffController } from '../controllers/rest/buff_controller';
import { StatController } from '../controllers/rest/stat_controller';
import { BuffStatValueController } from '../controllers/rest/buff_stat_value_controller';

const restRouter = express.Router();

// REST routes for buffs
const buffController = new BuffController();
restRouter.get("/buffs", buffController.getBuffs);
restRouter.post("/buffs", buffController.createBuff);
restRouter.put("/buffs", buffController.editBuff);
restRouter.delete("/buffs", buffController.deleteBuff);

// REST routes for stats
const statController = new StatController();
restRouter.post("/stats", statController.createStat);
restRouter.delete("/stats", statController.deleteStat);

// REST routes for buff_stat_values
const buffStatValueController = new BuffStatValueController();
restRouter.get("/buffstatvalues", buffStatValueController.getBuffStatValue);
restRouter.post("/buffstatvalues", buffStatValueController.addNewBuffStatValue);

export { restRouter };
