const snappy = require('snappy');

/**
 * compresses data
 * @param string
 * @returns {Promise<Buffer>}
 */
module.exports.compress = async (string) => await snappy.compress(string);

/**
 * uncompresses compressed data
 * @param string
 * @returns {Promise<string|Buffer>}
 */
module.exports.uncompress = async (string) => await snappy.uncompress(string);