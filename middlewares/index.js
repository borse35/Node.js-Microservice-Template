const express = require("express");
const helmet = require("helmet"); // https://github.com/helmetjs/helmet TODO read
const errorhandler = require("errorhandler");
const passport = require("passport");
const morgan = require("morgan");
const { isProduction } = require('../config');

// TODO add apm
// TODO add sentry
// TODO add cors?:wq

passport.authenticate('google')

const bodyParser = express.json({
  inflate: false, // delegate to nginx?
  limit: '100kb',
});

const developmentErrorHandler = isProduction ? null : errorhandler();

const getResponseSender = res => (data, status = 200) => res.status(status).json({ data });
const responseSender = async (req, res, next) => {
  res.sendResponse = getResponseSender(res);
  next();
};

const authorized = async (req, res, next) => {
  throw new Error('Not Authorized!');
};

module.exports = {
  mandatory: [
    developmentErrorHandler,
    bodyParser,
    responseSender,
    helmet(),
    morgan('short'),
  ].filter(Boolean),
  authorized,
};