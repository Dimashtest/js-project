const clients = require('../models/clientsModel')

exports.getAllClients = async (req, res) => {
    try{
        const client = await clients.findAll()
        res.json(client)
    } catch(error) {
        res.status(500).json({ error: 'Ошибка при получении данных' })
    }
}