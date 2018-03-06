import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { ApiRouter } from './api/api.router';
import { } from ''
export const MainApp = express();

// configure logging
MainApp.use(morgan('combined'));

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, isOnWhitelist(origin));
  }
}

// add ApiRouter
MainApp.use('/api', cors(corsOptions), ApiRouter());

// add ApiRouter
MainApp.use('/', express.static('dist-static'));

/**
 * Error handling function
 */
MainApp.use((err: any, request: Request, response: Response, next: NextFunction) => {
  console.error('HTTP request handling error');
  console.error(err);
  response.status(500).send({ error: 'Something failed!' })
});


function isOnWhitelist(origin: string): boolean {
  return true;
}
