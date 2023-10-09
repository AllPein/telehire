import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly cls: ClsService) {}

  private logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `Logging HTTP request ${req.method} ${req.url} ${
        res.statusCode
      } ${this.cls.getId()}`,
    );
    next();
  }
}
