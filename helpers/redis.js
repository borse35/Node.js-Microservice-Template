const { compress, uncompress } = require('./compression');
const Redis = require('../connections/redis');
const { REDIS_DEFAULT_EXPIRY } = require("../constants");

const redis = Redis.connect();

/**
 * sets key value pair in redis with expiry
 * @param key {string}
 * @param value {object}
 * @param expiry {number}
 * @returns {Promise<*>}
 */
const setKey = async (key, value, expiry = REDIS_DEFAULT_EXPIRY) =>
  await redis.set(key, await compress(JSON.stringify(value)), 'EX', expiry)

/**
 * get value stored against key from redis
 * @param key {string}
 * @returns {Promise<*>}
 */
const getKey = async (key) =>
  await redis.get(key).then(uncompress).then(JSON.parse);

module.exports = {
  setKey,
  getKey,
};

