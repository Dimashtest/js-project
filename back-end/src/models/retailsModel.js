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
        numberofrooms_id: DataTypes.INTEGER,
        distancetothesea_id: DataTypes.INTEGER,
        intheroom_id: DataTypes.INTEGER,
        intheteretory_id: DataTypes.INTEGER,
        near_id: DataTypes.INTEGER,
        rules_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'retail'
    }
)


module.exports = retail