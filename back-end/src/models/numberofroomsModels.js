const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const retail = require('./retailsModel')

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
        tableName: 'numberofroom'
    }
)

numberofroom.belongsTo(retail, { foreignKey: 'retail_id' })

module.exports = numberofroom