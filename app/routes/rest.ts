import express = require('express');
import { BuffController } from '../controllers/rest/buff_controller';
import { StatController } from '../controllers/rest/stat_controller';
import { BuffStatValueController } from '../controllers/rest/buff_stat_value_controller';
import { StatBufferController } from '../controllers/rest/stat_buffer_controller';

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
restRouter.put("/stats", statController.editStat);

// REST routes for buff_stat_values
const buffStatValueController = new BuffStatValueController();
restRouter.get("/buffstatvalues", buffStatValueController.getBuffStatValue);
restRouter.post("/buffstatvalues", buffStatValueController.addNewBuffStatValue);

// REST routes for stat_buffer
const statBufferController = new StatBufferController();
restRouter.get("/statbuffer", statBufferController.buffStats);

export { restRouter };
