import { Request, Response, NextFunction } from "express";
import { statModel } from "../../models/stat";
import axios = require('axios');

export class WebAppStatController {

    public async renderViewAllStatsPage(req: Request, res: Response, next: NextFunction) {
        console.log("Render All Stats Requested.");
        const stats = await statModel.find().exec();
        res.render("stats/view_all_stats.pug", { stats: stats });
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
}