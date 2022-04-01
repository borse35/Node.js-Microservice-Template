// sequelize-cli will use this file to get config for pg connection

const config = require('config');
const sequelizeConfig = {};

// assuming postgres is being used
sequelizeConfig[config.env] = {
  ...require("../connections/pg").getDbOptions(config.databases.pg.primary),
  dialect: config.databases.pg.dialect,
  // Use a different storage. Default: none
  "seederStorage": "sequelize",
};


module.exports = sequelizeConfig;