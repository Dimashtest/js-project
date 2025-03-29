const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const inTheTerritory = sequelize.define(
    'inTheTerritory',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        parking: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        besedka: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        gril: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        swimmingpool: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        furniture: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        tableName: 'intheterritory',
        timestamps: false
    }
);

module.exports = inTheTerritory;
