const rentAppartments = require('../models/rentAppartmentsModel')
const retail = require('../models/retailsModel')

exports.getAllRentals = async (req, res) => {
    try {
        const rentals = await rentAppartments.findAll({
            include: [{
                model: retail,
                as: 'retail' // Указываем alias, как в определении связи
            }]
        });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};