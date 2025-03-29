const Property = require('../models/propertiesModel')
const Location = require('../models/locationsModel')

module.exports = {
    async createProperty(req, res) {
        try {
            const property = await Property.create(req.body)
            res.status(201).json(property)
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при создании объекта аренды', error })
        }
    },

    async getAllProperties(req, res) {
        try {
            const properties = await Property.findAll({
                include: {
                    model: Location,
                    as: 'Location'
                }
            })
            res.json(properties)
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при получении объектов', error })
        }
    }
}