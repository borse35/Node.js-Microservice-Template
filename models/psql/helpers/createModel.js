const { validateModel } = require("./validations");
const sequelize = require('../../../connections/pg').connect();

const _addCustomProps = modelClass => {
  // override and add custom props here
};

/**
 * creates a sequelize model after some basic validations
 * @param modelClass
 * @param attributes
 * @param options
 * @returns {*}
 */
module.exports.createModel = (modelClass, attributes, options = {}) => {
  Object.assign(options, {
    sequelize, // connection instance
    paranoid: true, // only allow soft deletes
  });

  // validating model
  validateModel(modelClass, attributes, options);

  modelClass.init(attributes, options);

  _addCustomProps(modelClass);

  return modelClass;
};