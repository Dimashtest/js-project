const distancetothesea = require('../models/distancetotheseasModel')

exports.getAllDistanceToTheSea = async (req, res) => {
    try {
        const disctance = await distancetothesea.findAll()
        res.json(disctance)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}