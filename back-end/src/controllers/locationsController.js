const Location = require('../models/locationsModel')

module.exports = {
  async createLocation(req, res) {
    try {
      const location = await Location.create(req.body)
      res.status(201).json(location)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании локации', error })
    }
  },

  async getAllLocations(req, res) {
    try {
      const locations = await Location.findAll()
      res.json(locations)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении локаций', error })
    }
  }
}