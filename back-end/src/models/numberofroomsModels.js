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
        numberofsplitedbeds: DataTypes.INTEGER,    
        square: DataTypes.INTEGER,
        guests: DataTypes.INTEGER,
        rooms: DataTypes.INTEGER,
        description: DataTypes.TEXT
    },
    {
        tableName: 'numberofroom',
        timestamps: false
    }
)

module.exports = Numberofroom