import { NextFunction, Request, Response } from 'express';

export class BuffCategoryController {

    public async getBuffCategory(req: Request, res: Response, next: NextFunction) {
        res.send("get Buff Category called");
    }
}