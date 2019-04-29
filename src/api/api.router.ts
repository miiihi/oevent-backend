import * as express from 'express';

import { getDbPool } from '../db.config';
import { modelBase } from './models/_modelBase';
import { OevCategory } from './models/oevCategory';
import { OevClub } from './models/oevClub';
import { OevCompetitor } from './models/oevCompetitor';

const _oevCategory = new OevCategory();
const _oevCompetitor = new OevCompetitor();
const _oevClub = new OevClub();

const models: modelBase[]  = [
  _oevCategory,
  _oevCompetitor,
  _oevClub
];

const EVENT = 'event';

export function ApiRouter(options?: express.RouterOptions)  {
  const router = express.Router(options);
  const dbPool = getDbPool();

  models.forEach(model => {
    // all route
    router.get(model.path, (req, res, next) => {
      dbGet(model.getAllSQL(parseQueryEvent(req)), req, res, next);
    });
    // one route
    router.get(model.path + '/:id', (req, res, next) => {
      dbGetOne(model.getOneSQL(parseQueryEvent(req)), req, res, next);
    });
  });

  // results
  router.get('/results', (req, res, next) => {
    const events = parseQueryEvent(req);
    dbGet(_oevCompetitor.getAllSQL(events) + ' WHERE '
      + _oevCompetitor.getWhereFinished(events) + ' ORDER BY ' + _oevCompetitor.getSortFinished(events) , req, res, next);
  });
  router.get(_oevCategory.path + '/:id/results', (req, res, next) => {
    const events = parseQueryEvent(req);
    dbGetOne(_oevCompetitor.getAllSQL(events) + ' WHERE '
      + _oevCompetitor.getWhereFinishedCat(events) + ' ORDER BY ' + _oevCompetitor.getSortFinished(events) , req, res, next);
  });

  // start list
  router.get('/startlist', (req, res, next) => {
    const events = parseQueryEvent(req);
    dbGet(_oevCompetitor.getAllSQL(events) + ' WHERE '
      + _oevCompetitor.getWhereStart(events) + ' ORDER BY ' + _oevCompetitor.getSortStart(events) , req, res, next);
  });
  router.get(_oevCategory.path + '/:id/startlist', (req, res, next) => {
    const events = parseQueryEvent(req);
    dbGetOne(_oevCompetitor.getAllSQL(events) + ' WHERE '
      + _oevCompetitor.getWhereStartCat(events) + ' ORDER BY ' + _oevCompetitor.getSortStart(events) , req, res, next);
  });

  return router;

  function dbGet (sql, req, res, next) {
    // Get a free pool
    dbPool.get(function(err, db) {
      if (err) {
        next(err);
      } else {
        db.query(sql, function(err1, result) {
          if (err1) {
            next(err1);
          } else {
            res.json({data: result});
          }
          // IMPORTANT: close the connection
          db.detach();
        });
      }
    });
  }

  function dbGetOne (sql, req, res, next) {
    // Get a free pool
    dbPool.get(function(err, db) {
      if (err) {
        next(err);
      } else {
        const id = parseInt(req.params['id'], 10);
        if (isNaN(id)) {
          return next();
        }
        db.query(sql, id, function(err1, result) {
          if (err1) {
            next(err1);
          } else {
            res.json({data: result});
          }
          // IMPORTANT: close the connection
          db.detach();
        });
      }
    });
  }
}

function parseQueryEvent(req): number[] {
  if (req.query[EVENT]) {
    const ret = [];
    const evs = req.query[EVENT].split(',');
    evs.forEach( e => {
      const e_parsed = parseInt(e, 10);
      if (e_parsed >= 1 && e_parsed <= 10) {
        ret.push(e_parsed);
      }
    });
    return ret;
  }
  return null;
}
