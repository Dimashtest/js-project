const inTheRoom = require('../models/intheroomsModel')

exports.getAllInTheRooms = async (req, res) => {
  try {
    const rooms = await inTheRoom.findAll()
    const result = []

    rooms.forEach(room => {
      const amenities = {}

      if (room.wifi) amenities.wifi = 'Wi-Fi'
      if (room.conditioner) amenities.condition = 'Кондиционер'
      if (room.fridge) amenities.fridge = 'Холодильник'
      if (room.dishwasher) amenities.fridge = 'Посудомойка'
      if (room.kitchen) amenities.kitchen = 'Кухня'
      if (room.balcony) amenities.balcony = 'Балкон'
      if (room.jacuzzi) amenities.fridge = 'Джакузи'
      if (room.sauna) amenities.fridge = 'Сауна'
      if (room.terrace) amenities.fridge = 'Терраса'
      if (room.microwave) amenities.fridge = 'Микроволновка'
      if (room.hairdryer) amenities.fridge = 'Фен'
      if (room.iron) amenities.fridge = 'Утюг'
      if (room.electickettle) amenities.fridge = 'Электрочайник'
      if (room.dish) amenities.fridge = 'Посуда'
      if (room.towel) amenities.fridge = 'Полотенца'
      if (room.tv) amenities.tv = 'Телевизор'
      
      result.push({
        intheroom_id: room.intheroom_id,
        amenities
      });
    });

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}
