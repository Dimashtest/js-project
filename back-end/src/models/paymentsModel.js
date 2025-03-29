const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Payment = sequelize.define(
    'Payment',
    {
        payment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bookings',
                key: 'booking_id'
            }
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        method: {
            type: DataTypes.STRING, // например: 'card', 'cash'
            allowNull: false
        },
        payment_date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.STRING, // например: 'paid', 'pending', 'failed'
            defaultValue: 'pending'
        }
    },
    {
        tableName: 'payments'
    }
)

module.exports = Payment