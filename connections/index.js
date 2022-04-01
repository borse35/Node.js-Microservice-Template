const mongo = require("./mongodb");
const postgres = require("./pg");
const redis = require("./redis");
const { exitGracefully } = require("../events/closeServer");
const { MAX_CONNECTION_DELAY } = require("../constants");

const catchPromise = msg => err => {
  console.log(err);
  exitGracefully(msg);
};

const first = arr => arr[0];
const second = arr => arr[1];

/**
 * opens all external connections
 * @returns {Promise<void>}
 */
module.exports.establishConnections = () => {
  const connectionPromises = [
    [mongo.connect(), 'MongoDb connection request timedout'],
    [postgres.connect(), 'PG connection request timedout'],
    [redis.connect(), 'Redis connection request timedout'],
  ];


  return Promise.allTimeout(
    connectionPromises.map(first),
    MAX_CONNECTION_DELAY,
    connectionPromises.map(second),
  ).catch(catchPromise('ConnectionError'));
};

/**
 * closes all external connrections
 * @returns {Promise<void>}
 */
module.exports.closeConnections = async () => {
  const closingPromises = [
    [mongo.close(), 'MongoDb connection closing request timedout'],
    [postgres.close(), 'PG connection closing request timedout'],
    [redis.close(), 'Redis connection closing request timedout'],
  ];

  return Promise.allTimeout(
    closingPromises.map(first),
    MAX_CONNECTION_DELAY,
    closingPromises.map(second),
  ).catch(catchPromise('ShutDownError'));
};