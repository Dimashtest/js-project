const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')


const Retail = sequelize.define(
    'Retail',
    {
        retail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        property_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'properties',
                key: 'property_id'
            }
        }
    },
    {
        tableName: 'retail'
    }
)


module.exports = Retail;