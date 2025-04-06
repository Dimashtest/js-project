const Property = require('../models/propertiesModel');
const Location = require('../models/locationsModel');
const DistanceToTheSea = require('../models/distancetotheseasModel');
const InTheRoom = require('../models/intheroomsModel');
const InTheTerritory = require('../models/intheterritoriesModel');
const Near = require('../models/nearsModel');
const NumberOfRoom = require('../models/numberofroomsModels');
const Service = require('../models/servicesModel');
const Price = require('../models/pricesModel');

module.exports = {
    async createProperty(req, res) {
        try {
            const property = await Property.create(req.body);
            res.status(201).json(property);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании объекта аренды', error });
        }
    },
    // Получение всех объектов недвижимости с подгруженными данными
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
                    { model: Service, as: 'Service' },
                    { model: Price, as: 'Price' }
                ]
            });

            res.json(properties);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении объектов', error: error.message });
        }
    },
    async getPropertyCounts(req, res) {
        try {
            // Прямо запросим количество объектов по типам
            const hotelsCount = await Property.count({ where: { type: 'hotel' } });
            const apartmentsCount = await Property.count({ where: { type: 'apartment' } });
            const housesCount = await Property.count({ where: { type: 'house' } });
            const guestHousesCount = await Property.count({ where: { type: 'guest_houses' } });
            const privateSectorCount = await Property.count({ where: { type: 'private_sector' } });

            res.json({
                hotels: hotelsCount,
                apartments: apartmentsCount,
                houses: housesCount,
                guestHouses: guestHousesCount,
                privateSector: privateSectorCount
            });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении данных', error: error.message });
        }
    },
    async getPropertyByQueryId(req, res) {
        try {
            const { id } = req.query;
    
            if (!id) {
                return res.status(400).json({ message: "ID не передан" });
            }
    
            const property = await Property.findOne({
                where: { property_id: id },
                include: [
                    { model: Location, as: 'Location' },
                    { model: DistanceToTheSea, as: 'DistanceToTheSea' },
                    { model: InTheRoom, as: 'InTheRoom' },
                    { model: InTheTerritory, as: 'InTheTerritory' },
                    { model: Near, as: 'Near' },
                    { model: NumberOfRoom, as: 'NumberOfRoom' },
                    { model: Service, as: 'Service' },
                    { model: Price, as: 'Price' }
                ]
            });
    
            if (!property) {
                return res.status(404).json({ message: "Объект не найден" });
            }
    
            res.json(property);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении объекта', error: error.message });
        }
    }
    
};