import express = require('express');
import { BuffController } from '../controllers/buff_controller';

const restRouter = express.Router();

// REST routes for buff
const buffController = new BuffController();
restRouter.get("/buffs", buffController.getBuffs);
restRouter.post("/buffs", buffController.createBuff);

export { restRouter };