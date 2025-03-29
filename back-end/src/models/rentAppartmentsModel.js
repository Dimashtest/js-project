const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const retail = require('./retailsModel'); // Импортируем модель retail
const clients = require('./clientsModel'); // Импортируем модель clients


// Модель бронирования внутри этого же файла
const Booking = sequelize.define(
    'Booking',
    {
        booking_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        retail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'retail',
                key: 'retail_id'
            }
        },
        start_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        }
    },
    {
        tableName: 'bookings'
    }
);

Booking.belongsTo(clients, { foreignKey: 'client_id' });
Booking.belongsTo(retail, { foreignKey: 'retail_id' });

module.exports = Booking