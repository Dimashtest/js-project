const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Location = sequelize.define('Location', {
    location_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    house_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    },
    {
    tableName: 'locations',
    timestamps: false
    }
)

module.exports = Location