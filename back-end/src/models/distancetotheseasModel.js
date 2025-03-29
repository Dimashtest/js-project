const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')


const distancetothesea = sequelize.define(
    'distancetothesea', 
    {
        distancetothesea_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        distance: DataTypes.STRING,
    },
    {
        tableName: 'distancetothesea',
        timestamps: false
    }
)

module.exports = distancetothesea