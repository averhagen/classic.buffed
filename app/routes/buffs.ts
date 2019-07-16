import express = require('express');
import { BuffModel } from '../models/buff';

const buffRouter = express.Router();

buffRouter.get('/', async (req, res, next) => {
    console.log("buff get called");
    const buffs = await BuffModel.find().exec();
    res.render('buffs/view_all_buffs', { buffs: buffs });
});

export { buffRouter };
