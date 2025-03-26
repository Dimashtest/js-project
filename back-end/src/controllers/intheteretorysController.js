const InTheTerritory = require('../models/intheteretoryModel');

exports.getAllInTheTerritories = async (req, res) => {
  try {
    const territories = await InTheTerritory.findAll();
    res.json(territories);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};