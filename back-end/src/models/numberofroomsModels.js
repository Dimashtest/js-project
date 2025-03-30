const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Numberofroom = sequelize.define(
    'Numberofroom', 
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

module.exports = Numberofroom