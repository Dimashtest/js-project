const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const inTheRoom = sequelize.define(
    'inTheRoom',
    {
        intheroom_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wifi: DataTypes.BOOLEAN,
        conditioner: DataTypes.BOOLEAN,
        fridge: DataTypes.BOOLEAN,
        dishwasher: DataTypes.BOOLEAN,
        kitchen: DataTypes.BOOLEAN,
        balcony: DataTypes.BOOLEAN,
        jacuzzi: DataTypes.BOOLEAN,
        sauna: DataTypes.BOOLEAN,
        terrace: DataTypes.BOOLEAN,
        microwave: DataTypes.BOOLEAN,
        hairdryer: DataTypes.BOOLEAN,
        iron: DataTypes.BOOLEAN,
        electickettle: DataTypes.BOOLEAN,
        dish: DataTypes.BOOLEAN,
        towel: DataTypes.BOOLEAN,
        tv: DataTypes.BOOLEAN
    },
    {
        tableName: 'intheroom',
        timestamps: false
    }
)

module.exports = inTheRoom