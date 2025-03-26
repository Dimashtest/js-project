const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const payments = require('./paymentsModel')

const clients = sequelize.define(
    'clients',
    {
        client_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        client_surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'clients'
    }
)

clients.hasMany(payments, { foreignKey: 'client_id', as: 'payments' })
payments.belongsTo(clients, { foreignKey: 'client_id', as: 'client' })

module.exports = clients