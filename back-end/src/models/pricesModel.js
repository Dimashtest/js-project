const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Price = sequelize.define(
    'Price',
    {
        price_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'price',
        timestamps: false
    }
)

module.exports = Price