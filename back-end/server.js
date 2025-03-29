require('dotenv').config()

const sequelize = require('./src/config/db')
const express = require('express')
const cors = require('cors')

const rentRoutes = require('./src/routes/rentAppartmentsRoutes')
const clientRoutes = require('./src/routes/clientsRoutes')
const paymetRoutes = require('./src/routes/paymentsRoutes')
const locationRoutes = require('./src/routes/locationsRoutes')
const propertyRoutes = require('./src/routes/propertiesRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/rentRoutes', rentRoutes)
app.use('/api/clientRoutes', clientRoutes)
app.use('/api/paymentRoutes', paymetRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/intheroom', require('./src/routes/intheroomsRoutes'))
app.use('/api/intheterritory', require('./src/routes/intheterritoriesRoutes'))
app.use('/api/near', require('./src/routes/nearsRoutes'))
app.use('/api/distancetothesea', require('./src/routes/distancetotheseasRoutes'))
app.use('/api/service', require('./src/routes/servicesRoutes'))
app.use('/api/numberofroom', require('./src/routes/numberofroomsRoutes'))

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

