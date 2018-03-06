# OEVENT Backend

Is a NodeJs application providing a rest API to the basic OEVENT data

## Installation
Requires NodeJs > 8, then use
`npm install` or `yarn install`

## Configuration
Firebird database connection parameters have to be provided either via `process.env` variables or via modifying defaults. See `src/db.config.ts` for details. You have to use OEvent in networked mode!

## Building
Use `npm run build` or `yarn run build`

## Running
Use `npm run build` or `yarn run build`

Optionally copy additional static content to the `dist-static` folder, which is then served on the root path.

The app is started on the default port 7770, which can be overridden via `process.env.PORT`

## API
All routes are read-only - GET.

If `event` query string is provided, results will be limited to that event, otherwise all are returned.

The following api routes are implemented:

### /api/category[?event=[1,...]]
A list of all categories

### /api/category/:id[?event=[1,...]]
A single category

### /api/club[?event=[1,...]]
A list of all clubs

### /api/club/:id[?event=[1,...]]
A single club

### /api/competitor[?event=[1,...]]
A list of all competitors

### /api/competitor/:id[?event=[1,...]]
A single competitors

### /api/results[?event=[1,...]]
A list of results for all categories

### /api/category/:id/results[?event=[1,...]]
A list of results for single category

### /api/startlist[?event=[1,...]]
A startlist for all categories

### /api/startlist/:id/results[?event=[1,...]]
A startlist for single category
