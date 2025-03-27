const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const retail = require('./retailsModel')

const distancetothesea = sequelize.define(
    'distancetothesea', 
    {
        distancetothesea_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        disctance: DataTypes.FLOAT,
    },
    {
        tableName: 'distancetothesea'
    }
)

distancetothesea.belongsTo(retail, { foreignKey: 'retail_id' })

module.exports = distancetothesea