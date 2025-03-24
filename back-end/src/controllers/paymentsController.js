const payments = require('../models/paymentsModel')

exports.getAllPaymetns = async (req, res) => {
    try{
        const payment = await payments.findAll()
        res.json(payment)
    } catch(error) {
        res.status(500).json({ error: 'Ошибка при получении данных' })
    }
}