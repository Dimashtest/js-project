const whatisrent = require('../models/whatisrentsModel')

exports.getAllRents = async (req, res) => {
    try{
        const rent = await whatisrent.findAll()
        res.json(rent)
    } catch(error) {
        res.status(500).json({ error: 'Ошибка при получении данных' })
    }
}