import * as http from 'http';
import * as nodeCleanup from 'node-cleanup';

import { MainApp } from './main.app';

const DEFAULT_PORT = 7770;
const port = process.env.PORT || DEFAULT_PORT;
let server;

// and start the server
server = http.createServer(MainApp);

// Wrap the server object with additional functionality.
// This should be done immediately after server construction, or before you start listening.
// Additional functionailiy needs to be added for http server events to properly shutdown.
server = require('http-shutdown')(server);

server.on('error', (err) => {
  console.error('Exiting with error.');
  console.error(err);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`HTTP server started on port: ${port}`);
});

// graceful handling of signals
nodeCleanup(function (exitCode, signal) {
  if (signal) {
    console.log(`HTTP server received signal: ${signal}, starting shutdown`);

    server.shutdown(function done() {
      console.log('HTTP server gracefull shutdown complete.');
      // calling process.exit() won't inform parent process of signal
      process.kill(process.pid, signal);
    });
    nodeCleanup.uninstall(); // don't call cleanup handler again
    return false;
  }
});
