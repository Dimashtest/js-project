const near = require('../models/nearModel')

exports.getAllNear = async (req, res) => {
  try {
    const nearPlaces = await near.findAll()
    res.json(nearPlaces)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}