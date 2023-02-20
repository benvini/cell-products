import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const path = req.method + ' /' + req.params[0];
    console.log(`Request ${path}`);
    next();
  }
}
