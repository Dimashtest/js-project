const Retail = require('../models/retailsModel');
const Property = require('../models/propertiesModel');

// Создать retail с деталями
exports.createRetail = async (req, res) => {
    try {
        const { price, property_id } = req.body;
        const newRetail = await Retail.create({ price, property_id });
        res.status(201).json({ message: 'Retail создан с деталями', retail: newRetail });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при создании retail с деталями' });
    }
};

// Получить все retail с деталями
exports.getAllRetail = async (req, res) => {
    try {
        const items = await Retail.findAll({
            include: [
                { model: Property, as: 'property' }
            ]
        });
        res.status(200).json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ошибка при получении retail' });
    }
};