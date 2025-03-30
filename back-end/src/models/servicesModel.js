const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transfer: DataTypes.BOOLEAN,
  registration: DataTypes.BOOLEAN,
  elevator: DataTypes.BOOLEAN,
  invalidAccess: DataTypes.BOOLEAN
},
  {
    tableName: 'service',
    timestamps: false
  }
)

module.exports = Service