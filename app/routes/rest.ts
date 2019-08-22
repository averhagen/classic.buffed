import express = require('express');
import { BuffController } from '../controllers/rest/buff_controller';
import { StatController } from '../controllers/rest/stat_controller';
import { BuffStatValueController } from '../controllers/rest/buff_stat_value_controller';
import { BuffSetController } from '../controllers/rest/buff_set_controller';
import { BuffCategoryController } from '../controllers/rest/buff_category_controller';
import { RestControllerStatCategory } from '../controllers/rest/rest.controller.stat_category';

const restRouter = express.Router();

// REST routes for buffs
const buffController = new BuffController();
restRouter.get("/buffs", buffController.getBuffs);
restRouter.post("/buffs", buffController.createBuff);
restRouter.put("/buffs", buffController.editBuff);
restRouter.delete("/buffs", buffController.deleteBuff);

// REST routes for buff_category
const buffCategoryController = new BuffCategoryController();
restRouter.get("/buffcategory", buffCategoryController.getBuffCategory);
restRouter.post("/buffcategory", buffCategoryController.createBuffCategory);

// REST routes for stats
const statController = new StatController();
restRouter.post("/stats", statController.createStat);
restRouter.delete("/stats", statController.deleteStat);
restRouter.put("/stats", statController.editStat);

// REST routes for stat category
const statCategoryController = new RestControllerStatCategory();
restRouter.post("/statcategory", statCategoryController.createStatCategory);

// REST routes for buff_stat_values
const buffStatValueController = new BuffStatValueController();
restRouter.get("/buffstatvalues", buffStatValueController.getBuffStatValue);
restRouter.post("/buffstatvalues", buffStatValueController.addNewBuffStatValue);

// REST routes for stat_buffer
const buffSetController = new BuffSetController();
restRouter.get("/buffsets", buffSetController.getBuffSet);

export { restRouter };
