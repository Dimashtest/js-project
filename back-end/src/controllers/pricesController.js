const price = require('../models/pricesModel')

exports.getAllPrice = async (req, res) => {
    try {
        const prices = await price.findAll()
        res.json(prices)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}