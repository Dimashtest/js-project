const numberofroom = require('../models/numberofroomsModels')

exports.getAllNumberOfRoom = async (req, res) => {
    try {
        const number = await numberofroom.findAll()
        res.json(number)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}