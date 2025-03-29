const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')


const retail = sequelize.define(
    'retail',
    {
        retail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numberofrooms_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'numberofroom',
                key: 'numberofrooms_id'
            }
        },
        distancetothesea_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'distancetothesea',
                key: 'distancetothesea_id'
            }
        },
        intheroom_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'intheroom',
                key: 'intheroom_id'
            }
        },
        intheterritory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'intheterritory',
                key: 'id' // Изменено на 'id'
            }
        },
        near_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'near',
                key: 'near_id'
            }
        },
        service_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'service',
                key: 'service_id'
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
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


module.exports = retail;