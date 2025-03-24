const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const clients = require('./clientsModel')

const rentAppartments = sequelize.define(
    'rentAppartments',

    {
       booking_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
       },
       client_id: {
        type: DataTypes.INTEGER,
        allowNull: false
       } 
    },
    {
        tableName: 'rent_appartments'
    }
)

clients.hasMany(rentAppartments, { foreignKey: 'client_id' })
rentAppartments.belongsTo(clients, { foreignKey: 'client_id' })

module.exports = rentAppartments