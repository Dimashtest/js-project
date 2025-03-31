const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Подключение моделей
const Location = require('./locationsModel');
const DistanceToTheSea = require('./distancetotheseasModel');
const InTheRoom = require('./intheroomsModel');
const InTheTerritory = require('./intheterritoriesModel');
const Near = require('./nearsModel');
const NumberOfRoom = require('./numberofroomsModels');
const Service = require('./servicesModel');
const Price = require('./pricesModel');

const Property = sequelize.define('Property', {
    property_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        references: { model: Location, key: 'location_id' }
    },
    distancetothesea_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: DistanceToTheSea, key: 'distancetothesea_id' }
    },
    intheroom_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: InTheRoom, key: 'intheroom_id' }
    },
    interritory_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: InTheTerritory, key: 'interritory_id' }
    },
    near_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Near, key: 'near_id' }
    },
    numberofrooms_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: NumberOfRoom, key: 'numberofrooms_id' }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Service, key: 'service_id' }
    },
    price_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: Price, key: 'price_id' }
    }
}, {
    tableName: 'properties',
    timestamps: false
});

// Установка связей
Property.belongsTo(Location, { foreignKey: 'location_id', as: 'Location' });
Property.belongsTo(DistanceToTheSea, { foreignKey: 'distancetothesea_id', as: 'DistanceToTheSea' });
Property.belongsTo(InTheRoom, { foreignKey: 'intheroom_id', as: 'InTheRoom' });
Property.belongsTo(InTheTerritory, { foreignKey: 'interritory_id', as: 'InTheTerritory' });
Property.belongsTo(Near, { foreignKey: 'near_id', as: 'Near' });
Property.belongsTo(NumberOfRoom, { foreignKey: 'numberofrooms_id', as: 'NumberOfRoom' });
Property.belongsTo(Service, { foreignKey: 'service_id', as: 'Service' });
Property.belongsTo(Price, { foreignKey: 'price_id', as: 'Price' });

module.exports = Property;