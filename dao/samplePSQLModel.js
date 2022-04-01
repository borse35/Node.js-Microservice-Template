// Example file, delete later

const SamplePSQLModel = require('../models/psql/samplePSQLModel');

module.exports.createSampleRow = async () => await SamplePSQLModel.create({
  field1: 'def',
  field2: parseInt((Math.random() * 10000).toString()),
});

module.exports.getSampleRow = async () => await SamplePSQLModel.findOne({});