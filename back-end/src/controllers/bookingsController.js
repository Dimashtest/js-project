const Booking = require('../models/bookingsModel');
const Retail = require('../models/retailsModel');

// Получить все бронирования с retail
exports.getAllRetail = async (req, res) => {
    try {
      const items = await Retail.findAll({
        include: [
          { model: Property, as: 'property' }
        ]
      })
      res.status(200).json(items)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Ошибка при получении retail' })
    }
  }
  
  // ▶ Бронирование
  exports.createBooking = async (req, res) => {
    try {
      const { client_id, rentAppartment_id, start_date, end_date, total_price, status } = req.body
      const booking = await Booking.create({ client_id, rentAppartment_id, start_date, end_date, total_price, status })
      res.json(booking)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
  
  // ▶ Получить все бронирования
  exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.findAll()
      res.json(bookings)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }