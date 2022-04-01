// Example file, delete later

const { Model, DataTypes, Op, Deferrable } = require("sequelize");
const { createModel } = require("./helpers/createModel");

class SamplePSQLModel2 extends Model {};

module.exports = createModel(SamplePSQLModel2, {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  sample_field_of_foreign_table: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'abc',
    primaryKey: true,
    comment: 'sample_field_of_foreign_table'
  },
}, {});

SamplePSQLModel2.belongsTo(SamplePSQLModel);