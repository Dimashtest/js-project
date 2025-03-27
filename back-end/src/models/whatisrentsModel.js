const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const whatisrent = sequelize.define(
    'whatisrent',
    {
        retail_id: DataTypes.INTEGER,
        booking_id: DataTypes.INTEGER,
        startdate: DataTypes.DATE,
        enddate: DataTypes.DATE
    },
    {
        tableName: 'whatisrent'
    }
)

module.exports = whatisrent