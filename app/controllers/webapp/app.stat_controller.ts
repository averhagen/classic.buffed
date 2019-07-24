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
        console.log("Render Create Stats View Requeste");
        res.render("stats/create_stat.pug");
    }
}