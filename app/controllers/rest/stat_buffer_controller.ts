import { NextFunction, Request, Response } from "express";

export class StatBufferController {

    public async buffStats(req: Request, res: Response, next: NextFunction) {
        res.send("You've found the StatBuffer");
    }
}