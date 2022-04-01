const { UserError } = require("../errors/UserError");
const { isProduction } = require('../config');
const logger = require('pino')();

/**
 * checks is error thrown while processing request is thrown purposefully and sends response accordingly.
 * @param req
 * @param res
 * @param next
 * @param err
 */
const reqErrorHandler = (req, res, next, err) => {
  // TODO: test
  if (err instanceof UserError) {
    res.sendResponse({
      error: {
        type: 'UserError',
        message: err.message,
      }
    }, err.resCode);
  } else {
    logger.error('Error while processing request', req.originalUrl, err);
    next(err);
  }
};

/**
 * wraps req handler in an error handler
 * @param reqHandler
 * @returns {function(*=, *=, *=): any}
 */
const handlerWrapper = (reqHandler) => async (req, res, next) => {
  return await reqHandler(req, res, next).catch(e => reqErrorHandler(req, res, next, e));
};

/**
 * Checks if all keys of the object are truthy
 * @return {boolean}
 * @param obj
 */
const assertNonEmpty = (obj) => {
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (!value)
      throw new Error(`${key} is missing`);
  }
  return true;
};

const waitFor = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

// TODO write fn wrapper to cache results

module.exports = {
  handlerWrapper,
  logger: isProduction ? logger : console,
  assertNonEmpty,
  promisify: require('util').promisify,
  waitFor,
};