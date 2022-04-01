const { Sequelize, Transaction } = require('sequelize');
const cls = require('cls-hooked');

const config = require("../config");
const { logger, assertNonEmpty } = require('../helpers/utils');
// const { PSQL_OP_ALIASES } = require("../constants");

let sequelize;

/**
 * setting namespace so that transaction instance is automatically passed to sequelize in managed transaction block
 */
const setTransactionNameSpace = () => {
  const namespace = cls.createNamespace('transaction-namespace');
  Sequelize.useCLS(namespace);
};

// TODO test
/**
 * returns true if mongo connection has been established
 * @returns {Promise<boolean>}
 */
const isConnected = async () => sequelize && await sequelize.authenticate({ retry: null }).then(_ => true).catch(e => console.log(e));

/**
 * validates and return necessary db options
 * @param dbConfig
 * @param throwError
 * @param dialect
 * @returns {{password, database, port, host, username}|null}
 */
const getDbOptions = (dbConfig, { throwError = true } = {}) => {
  assertNonEmpty({ dbConfig });
  const { host, port, username, password, db_name: database } = dbConfig;

  try {
    assertNonEmpty({ host, port, database });
    return { host, port, username, password, database };
  } catch (e) {
    if (throwError) throw new Error(`Invalid PG config: ${JSON.stringify(dbConfig)}`);
    else return null;
  }
}
module.exports.getDbOptions = getDbOptions;

/**
 * creates pg connection
 * @param pgConfig
 * @returns {Sequelize}
 */
const createConnection = async (pgConfig) => {
  const getReadReplicaConfig = dbConfig => getDbOptions(dbConfig, { throwError: false });

  sequelize = new Sequelize({
    // operatorsAliases: PSQL_OP_ALIASES, // simpler aliases for sequelize operators
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // transaction isolation level
    replication: {
      read: (pgConfig.replicas || []).map(getReadReplicaConfig).filter(Boolean), // read replicas
      write: getDbOptions(pgConfig.primary) // primary
    },
    dialect: pgConfig.dialect,
  });
  setTransactionNameSpace();

  if (!await isConnected()) throw new Error('Unable to connect to Postgres');
  return sequelize;
};

/**
 * opens pg connection
 */
module.exports.connect = async () => {
  const pgConfig = config.databases.pg;
  if (!pgConfig) return;

  // return if already connected
  if (await isConnected()) return sequelize;

  await createConnection(pgConfig);

  logger.info('Connected to Postgres');
  return sequelize;
};

/**
 * closes pg connection
 */
module.exports.close = async () => {
  if (!await isConnected()) return;

  await sequelize.close();
  logger.info('Closed Postgres connection');
};