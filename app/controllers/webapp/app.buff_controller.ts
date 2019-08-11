import { NextFunction, Request, Response } from "express";
import { BuffModel } from "../../models/buff";
import { BuffStatValue } from "../../models/buff_stat_value"
import { statModel } from "../../models/stat";
import axios = require('axios');
import { BuffCategoryModel } from "../../models/buff_category";


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
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buffs/create_buff.pug', { buff_categories: buffCategories });
    }

    public async renderEditBuffPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render Edit Buff Page Requested.");
        try {
            const foundBuff = await BuffModel.findOne({ _id: req.query._id }).exec();
            if (foundBuff == null)
                throw new Error("Unable to find Buff");
            const buffStatValues = await BuffStatValue.find({ buff: foundBuff }).populate('stat').exec();
            res.render('buffs/edit_buff.pug', { buff: foundBuff, buffStatValues: buffStatValues, stats: await statModel.find().exec() });
        } catch (error) {
            next(error);
        }
    }

    public async editBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Edit Buff Requested.");
        try {
            const params: any = {};

            if (req.body._id) {
                params._id = req.body._id;
            } else {
                throw new Error("Invalid input.");
            }

            if (req.body.name) {
                params.name = req.body.name;
            }

            if (req.body.rank) {
                params.rank = req.body.rank;
            }
            await axios.default.put("http://localhost:3000/rest/buffs", null, { params });
            res.redirect('/buffs');
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }

    public async addBuffStatValue(req: Request, res: Response, next: NextFunction) {
        console.log("Add buff stat value called");
        try {
            const params: any = {};

            if (req.body.value && req.body.buff && req.body.stat) {
                params.value = req.body.value;
                params.buff = req.body.buff;
                params.stat = req.body.stat;

                await axios.default.post("http://localhost:3000/rest/buffstatvalues", null, { params });
                res.redirect('back');
            } else {
                throw new Error("Missing input.");
            }
        } catch (error) {
            next(error);
        }
    }
}