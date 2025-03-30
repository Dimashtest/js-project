const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Location = require('./locationsModel');
const Retail = require('./retailsModel');
const DistanceToTheSea = require('./distancetotheseasModel');
const InTheRoom = require('./intheroomsModel');
const InTheTerritory = require('./intheterritoriesModel');
const Near = require('./nearsModel');
const NumberOfRoom = require('./numberofroomsModels');
const Service = require('./servicesModel');

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
        references: {
            model: 'locations',
            key: 'location_id'
        }
    },
    distancetothesea_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'distancetothesea',
            key: 'distancetothesea_id'
        }
    },
    intheroom_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'intheroom',
            key: 'intheroom_id'
        }
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'intheterritory',
            key: 'id'
        }
    },
    near_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'near',
            key: 'near_id'
        }
    },
    numberofrooms_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'numberofroom',
            key: 'numberofrooms_id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'service',
            key: 'service_id'
        }
    }
}, {
    tableName: 'properties',
    timestamps: false
});

Property.belongsTo(Location, { foreignKey: 'location_id', as: 'Location' });
Property.belongsTo(DistanceToTheSea, { foreignKey: 'distancetothesea_id', as: 'DistanceToTheSea' });
Property.belongsTo(Near, { foreignKey: 'near_id', as: 'Near' });
Property.belongsTo(InTheRoom, { foreignKey: 'intheroom_id', as: 'InTheRoom' });
Property.belongsTo(InTheTerritory, { foreignKey: 'id', as: 'InTheTerritory' });
Property.belongsTo(NumberOfRoom, { foreignKey: 'numberofrooms_id', as: 'NumberOfRoom' });
Property.belongsTo(Service, { foreignKey: 'service_id', as: 'Service' });

Property.hasMany(Retail, { foreignKey: 'property_id', as: 'retails' });

module.exports = Property;