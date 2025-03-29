const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const numberofroom = sequelize.define(
    'numberofroom', 
    {
        numberofrooms_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        numberofbeds: DataTypes.INTEGER,
        numberofsplitedbeds: DataTypes.INTEGER
    },
    {
        tableName: 'numberofroom',
        timestamps: false
    }
)

module.exports = numberofroom