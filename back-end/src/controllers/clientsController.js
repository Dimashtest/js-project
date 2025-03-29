const clients = require('../models/clientsModel')

exports.registerClient = async (req, res) => {
    const { client_name, client_surname, email, password } = req.body;

    console.log('Зарегистрировать клиента:', client_name, client_surname, email, password); // Логируем данные для проверки

    try {
        const newClient = await clients.create({
            client_name,
            client_surname,
            email,
            password
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!', client: newClient });
    } catch (error) {
        console.error('Ошибка при регистрации клиента:', error); // Логируем ошибку
        res.status(500).json({ message: 'Ошибка при регистрации' });
    }
}

exports.loginClient = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await clients.findOne({ where: { email } });

        if (!client) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        if (client.password !== password) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        res.status(200).json({ message: 'Вход успешен', client })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка при входе' })
    }
}