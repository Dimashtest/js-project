const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const retail = require('./retailsModel')

const inTheTerritory = sequelize.define(
    'inTheTerritory',
    {
        intheteretory_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parking: DataTypes.BOOLEAN,
        besedka: DataTypes.BOOLEAN,
        gril: DataTypes.BOOLEAN,
        swimmingpool: DataTypes.BOOLEAN,
        furniture: DataTypes.BOOLEAN
    },
    {
        tableName: 'intheterritory'
    }
)

inTheTerritory.belongsTo(retail, { foreignKey: 'retail_id' })

module.exports = inTheTerritory