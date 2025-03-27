const Service = require('../models/servicesModel');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
