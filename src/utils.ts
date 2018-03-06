import { Response } from 'express';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const DEBUG = !!process.env.DEBUG;

export function disableCache(response: Response) {
  response.set({
    'Expires': 'Tue, 03 Jul 2001 06:00:00 GMT',
    'Last-Modified':  (new Date()).toUTCString(),
    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
  });
}
