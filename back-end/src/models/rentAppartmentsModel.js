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

clients.hasMany(rentAppartments, { foreignKey: 'client_id', as: 'rentals' })
rentAppartments.belongsTo(clients, { foreignKey: 'client_id', as: 'client' })

console.log('rentAppartments Model:', rentAppartments)

module.exports = rentAppartments