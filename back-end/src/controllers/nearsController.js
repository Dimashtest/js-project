const Near = require('../models/nearModel');

exports.getAllNear = async (req, res) => {
  try {
    const nearPlaces = await Near.findAll();
    res.json(nearPlaces);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};