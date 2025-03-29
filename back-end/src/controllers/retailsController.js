const { rentAppartments, Booking } = require('../models/rentAppartmentsModel')
const Retail = require('../models/retailModel')
const Service = require('../models/servicesModel')
const Near = require('../models/nearsModel')
const InTheRoom = require('../models/intheroomsModel')
const InTheTerritory = require('../models/intheterritoriesModel')
const DistanceToTheSea = require('../models/distancetotheseasModel')
const NumberOfRoom = require('../models/numberofroomsModels')

// ▶ Добавить аренду квартиры
const createRentAppartment = async (req, res) => {
  try {
    const { client_id, price } = req.body
    const rental = await rentAppartments.create({ client_id, price })
    res.json(rental)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ▶ Получить все аренды квартир
const getAllRentAppartments = async (req, res) => {
  try {
    const rentals = await rentAppartments.findAll()
    res.json(rentals)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ▶ Удалить аренду по ID
const deleteRentAppartment = async (req, res) => {
  try {
    const { id } = req.params
    await rentAppartments.destroy({ where: { booking_id: id } })
    res.json({ message: 'Удалено' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ▶ Добавить retail с деталями
const createRetail = async (req, res) => {
  try {
    const {
      price,
      service,
      near,
      inTheRoom,
      inTheTerritory,
      distanceToTheSea,
      numberOfRoom,
      property_id
    } = req.body;

    // Сначала создаем связанные сущности
    const createdService = await Service.create(service);
    const createdNear = await Near.create(near);
    const createdInTheRoom = await InTheRoom.create(inTheRoom);
    const createdInTheTerritory = await InTheTerritory.create(inTheTerritory);
    const createdDistanceToTheSea = await DistanceToTheSea.create(distanceToTheSea);
    const createdNumberOfRoom = await NumberOfRoom.create(numberOfRoom);

    // Теперь создаём retail с нужными foreign key
    const newRetail = await Retail.create({
      price,
      property_id,
      service_id: createdService.service_id,
      near_id: createdNear.near_id,
      intheroom_id: createdInTheRoom.intheroom_id,
      intheterritory_id: createdInTheTerritory.id, // если в этой таблице поле просто id
      distancetothesea_id: createdDistanceToTheSea.distancetothesea_id,
      numberofrooms_id: createdNumberOfRoom.numberofrooms_id
    });

    res.status(201).json({ message: 'Retail создан с деталями', retail: newRetail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при создании retail с деталями' });
  }
};

// ▶ Получить все retail с деталями
const getAllRetail = async (req, res) => {
  try {
    const items = await Retail.findAll({
      include: [
        { model: Service, as: 'service' },
        { model: Near, as: 'near' },
        { model: InTheRoom, as: 'intheroom' },
        { model: InTheTerritory, as: 'intheterritory' },
        { model: DistanceToTheSea, as: 'distancetothesea' },
        { model: NumberOfRoom, as: 'numberofrooms' }
      ]
    })
    res.status(200).json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Ошибка при получении retail' })
  }
}

// ▶ Бронирование
const createBooking = async (req, res) => {
  try {
    const { client_id, rentAppartment_id, start_date, end_date, total_price, status } = req.body
    const booking = await Booking.create({ client_id, rentAppartment_id, start_date, end_date, total_price, status })
    res.json(booking)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// ▶ Получить все бронирования
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll()
    res.json(bookings)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createRentAppartment,
  getAllRentAppartments,
  deleteRentAppartment,
  createRetail,
  getAllRetail,
  createBooking,
  getAllBookings
}