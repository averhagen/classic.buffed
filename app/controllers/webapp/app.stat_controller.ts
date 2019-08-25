import { Request, Response, NextFunction } from "express";
import { statModel } from "../../models/stat";
import axios = require('axios');
import { StatCategoryModel } from "../../models/stat_category";

export class WebAppStatController {

    public async renderViewAllStatsPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render All Stats Requested.");
        const stats = await statModel.find().exec();
        res.render("stats/view_all_stats.pug", { stats: stats });
    }

    public async renderEditStatView(req: Request, res: Response, next: NextFunction) {
        console.log("Render Edit Stats View Requested");
        try {
            const foundStat = await statModel.findOne({ _id: req.query._id }).exec();
            if (foundStat == null)
                return res.status(404).send("404 Unable to find stat");
            const stat_categories = await StatCategoryModel.find().exec();
            return res.render("stats/edit_stat.pug", { stat_categories: stat_categories, stat: foundStat });
        } catch (error) {
            return next(error);
        }
    }

    public async editStat(req: Request, res: Response, next: NextFunction) {
        console.log("Web app Edit Stat requested.");
        try {
            await axios.default.put("http://127.0.0.1:3000/rest/stats", null, { params: req.body });
            res.redirect("/stats");
        } catch (error) {
            next(error);
        }
    }

    public async renderCreateStatView(req: Request, res: Response, next: NextFunction) {
        console.log("Render Create Stats View Requested.");
        res.render("stats/create_stat.pug");
    }

    public async createStat(req: Request, res: Response, next: NextFunction) {
        console.log("Create Stat Requested.");
        try {
            await axios.default.post("http://127.0.0.1:3000/rest/stats?name=" + req.body.name);
            res.redirect("/stats");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    public async deleteStat(req: Request, res: Response, next: NextFunction) {
        console.log("Delete Stat Requested.");
        try {
            await axios.default.delete("http://127.0.0.1:3000/rest/stats?_id=" + req.query._id);
            res.redirect("/stats");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
}