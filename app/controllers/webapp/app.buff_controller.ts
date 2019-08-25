import { NextFunction, Request, Response } from "express";
import { BuffModel } from "../../models/buff";
import { BuffStatValue } from "../../models/buff_stat_value"
import { statModel } from "../../models/stat";
import axios = require('axios');
import { BuffCategoryModel } from "../../models/buff_category";


export class WebAppBuffController {

    public async renderViewAllBuffsPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render View All Buffs");
        const buffs = await BuffModel.find().populate('buff_category').exec();
        for (let i = 0; i < buffs.length; i++) {
            console.log(buffs[i]);
        }
        res.render('buffs/view_all_buffs.pug', { buffs: buffs });
    }

    public async renderCreateBuffPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render Create Buff Page");
        const buffCategories = await BuffCategoryModel.find().exec();
        res.render('buffs/create_buff.pug', { buff_categories: buffCategories });
    }

    public async renderEditBuffPage(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Render Edit Buff Page");
        try {
            const foundBuff = await BuffModel.findOne({ _id: req.query._id }).exec();
            if (foundBuff == null)
                throw new Error("Unable to find Buff");
            const buffStatValues = await BuffStatValue.find({ buff: foundBuff }).populate('stat').exec();
            res.render('buffs/edit_buff.pug',
                {
                    buff: foundBuff,
                    buff_categories: await BuffCategoryModel.find().exec(),
                    buffStatValues: buffStatValues,
                    stats: await statModel.find().exec()
                });
        } catch (error) {
            next(error);
        }
    }

    public async deleteBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Delete Buff");
        try {
            await axios.default.delete("/rest/buffs?_id=" + req.query._id, { baseURL: "http://localhost:3000" });
            res.redirect('/buffs');
        } catch (error) {
            console.log(error);
            return next(error);
        }
    }

    public async editBuff(req: Request, res: Response, next: NextFunction) {
        console.log("Web App Request: Edit Buff");
        try {
            const params: any = {};

            if (req.body._id) {
                params._id = req.body._id;
            } else {
                throw new Error("Invalid input.");
            }

            params.buff_category = req.body.buff_category;

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
        console.log("Web App Reqeust: Create Buff Stat Value");
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