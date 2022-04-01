// closing connections then exiting process
const { logger } = require("../helpers/utils");
const connections = require("../connections");

let serverLocal;

/**
 * closes all db connections and exits server gracefully
 * @param event
 */
const exitGracefully = (event) => {
  console.log('\n');
  logger.error(`${event} signal received: closing HTTP server`);

  connections.closeConnections().then(_ => {
    logger.info('Closed all db connections');

    serverLocal && serverLocal.close(() => {
      logger.info('HTTP server closed');
      process.exit(1);
    });
  });
};

process
  .on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    logger.error(err, 'Uncaught Exception thrown');
  })
  .on('SIGINT', exitGracefully)
  .on('SIGQUIT', exitGracefully)
  .on('SIGTERM', exitGracefully);

module.exports.default = (server) => serverLocal = server;
module.exports.exitGracefully = exitGracefully;