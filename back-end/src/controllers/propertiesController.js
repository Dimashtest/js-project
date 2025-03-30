const Property = require('../models/propertiesModel');
const Location = require('../models/locationsModel');
const DistanceToTheSea = require('../models/distancetotheseasModel');
const InTheRoom = require('../models/intheroomsModel');
const InTheTerritory = require('../models/intheterritoriesModel');
const Near = require('../models/nearsModel');
const NumberOfRoom = require('../models/numberofroomsModels');
const Service = require('../models/servicesModel');

module.exports = {
    async createProperty(req, res) {
        try {
            const property = await Property.create(req.body);
            res.status(201).json(property);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании объекта аренды', error });
        }
    },

    async getAllProperties(req, res) {
        try {
            const properties = await Property.findAll({
                include: [
                    { model: Location, as: 'Location' },
                    { model: DistanceToTheSea, as: 'DistanceToTheSea' },
                    { model: InTheRoom, as: 'InTheRoom' },
                    { model: InTheTerritory, as: 'InTheTerritory' },
                    { model: Near, as: 'Near' },
                    { model: NumberOfRoom, as: 'NumberOfRoom' },
                    { model: Service, as: 'Service' }
                ]
            });
            res.json(properties);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении объектов', error: error.message });
        }
    }
};