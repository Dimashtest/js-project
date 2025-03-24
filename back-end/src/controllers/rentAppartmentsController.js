const rentAppartments = require('../models/rentAppartmentsModel')

exports.getAllRentals = async (req, res) => {
    try{
        const rentals = await rentAppartments.findAll()
        res.json(rentals)
    } catch(error) {
        res.status(500).json({ error: 'Ошибка при получении данных' })
    }
}