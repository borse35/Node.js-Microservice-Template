require('./helpers/proto'); // do this before everything else
const express = require('express');
const app = express();
const config = require("./config");
const connections = require('./connections');
const { logger } = require('./helpers/utils');

(async () => {

  // adding middlewares
  app.use(...require('./middlewares').mandatory);

  // establishing connections
  await connections.establishConnections();

  // registering routes
  app.use(require('./routes'));

  // starting server
  const server = app.listen(config.server.port, () => {
    logger.info(`Listening on ${config.server.port}`);
  });

  // registering event listeners
  require('./events')({ server });

})();