const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const near = sequelize.define(
    'near',
    {
        near_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nightclub: DataTypes.BOOLEAN,
        spa: DataTypes.BOOLEAN,
        bar: DataTypes.BOOLEAN
    },
    {
        tableName: 'near',
        timestamps: false
    }
)

module.exports = near