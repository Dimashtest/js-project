const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Property = sequelize.define('Property', {
    property_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Это нужно!
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('hotel', 'house', 'apartment', 'guest_houses', 'private_sector'),
        allowNull: false
    },
    location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'locations',
            key: 'location_id'
        }
    }
}, {
    tableName: 'properties',
    timestamps: false
})

module.exports = Property