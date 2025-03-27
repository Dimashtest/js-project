require('dotenv').config
const sequelize = require('./src/config/db')
const express = require('express')
const cors = require('cors')

const rentRoutes = require('./src/routes/rentAppartmentsRoutes')
const clientRoutes = require('./src/routes/clientsRoutes')
const paymetRoutes = require('./src/routes/paymentsRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/rentRoutes', rentRoutes)
app.use('/api/clientRoutes', clientRoutes)
app.use('/api/paymentRoutes', paymetRoutes)
app.use('/intheroom', require('./src/routes/intheroomsRoutes'))
app.use('/intheterritory', require('./src/routes/intheterritoriesRoutes'))
app.use('/near', require('./src/routes/nearsRoutes'))
app.use('/distancetothesea', require('./src/routes/distancetotheseasRoutes'))
app.use('/service', require('./src/routes/servicesRoutes'))
app.use('/numberofroom', require('./src/routes/numberofroomsRoutes'))
app.use('/whatisrent', require('./src/routes/whatisrentsRoutes'))

const PORT = process.env.PORT

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('База данных подключена')

        await sequelize.sync({ alter: true })
        console.log('Базы синхронизировались')

        app.listen(PORT, () => { console.log(`Server starten on port http://localhost:${PORT}`); })

    } catch (error) {
        console.log("Ошибка: " + error.message);

    }
}

start()

