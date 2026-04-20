import {NestMiddleware} from "@nestjs/common";
import type {Request, Response, NextFunction} from "express";

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    console.log(`Request ======== ${req.method}, ${req.url}`);
    next();
  }
}
