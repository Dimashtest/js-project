const inTheTerritory = require('../models/intheterritoriesModel')

exports.getAllInTheTerritories = async (req, res) => {
  try {
    const territories = await inTheTerritory.findAll()
    res.json(territories)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}