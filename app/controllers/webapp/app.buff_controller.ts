import { Request, Response, NextFunction } from "express";
import { BuffModel } from "../../models/buff";
import axios = require('axios');

export class WebAppBuffController {

    public async deleteBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Received Buff delete request: " + req.url);
        try {
            await axios.default.delete("/rest/buffs?_id=" + req.query._id, { baseURL: "http://localhost:3000" });
            res.redirect('/buffs');
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }

    public async renderViewAllBuffsPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render All Buffs Requested.");
        const buffs = await BuffModel.find().exec();
        res.render('buffs/view_all_buffs.pug', { buffs: buffs });
    }

    public async renderCreateBuffPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render Create Buff Page Requested.");
        res.render('buffs/create_buff.pug');
    }

    public async renderEditBuffPage(req: Request, res: Response, next: NextFunction) {
        res.render('buffs/edit_buff.pug');
    }
}