const mongoose = require("mongoose");
const config = require("../config");
const { logger } = require('../helpers/utils');

/**
 * return mongo url
 * @param mongoConfig
 * @returns {`mongodb://${string}:${string}/${string}`}
 */
const getMongoUrl = (mongoConfig) => {
  const { host, port, db_name } = mongoConfig;
  return `mongodb://${host}:${port}/${db_name}`
};

// TODO test
/**
 * returns true if mongo connection has been established
 * @returns {boolean}
 */
const isConnected = () => !!mongoose.connection.db;

/**
 * opens mongo connection
 */
module.exports.connect = () => {
  const mongoConfig = config.databases.mongodb;
  if (!mongoConfig) return;

  // return if already connected
  if (isConnected()) return;

  if (config.debugMode) {
    mongoose.set("debug", true);
  }

  const res = mongoose.connect(getMongoUrl(mongoConfig), {
    "useNewUrlParser": true,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
  });

  return res.then(res => logger.info("Connected to MongoDB"));
};

/**
 * closes mongo connection
 * @returns {Promise<void>}
 */
module.exports.close = async () => new Promise((resolve, reject) => {
  if (!isConnected()) return resolve();

  mongoose.connection.close(function (err) {
    if (err) reject(err);

    logger.info("Closed MongoDb connection");
    resolve();
  });
});