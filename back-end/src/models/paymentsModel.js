const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const rentAppartments = require('./rentAppartmentsModel')
const clients = require('./clientsModel')

const payments = sequelize.define(
    'payments',
    {
        payment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        summa: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        tableName: 'payments'
    }
)

rentAppartments.hasMany(payments, { foreignKey: 'booking_id', as: 'payments' })
payments.belongsTo(rentAppartments, { foreignKey: 'booking_id', as: 'rental' })

clients.hasMany(payments, { foreignKey: 'booking_id', as: 'payments' })
payments.belongsTo(clients, { foreignKey: 'client_id', as: 'client' })

module.exports = payments
