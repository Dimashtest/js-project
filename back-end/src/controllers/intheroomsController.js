const inTheRoom = require('../models/intheroomsModel');
const InTheRoom = require('../models/intheroomsModel');

const getAllInTheRooms = async (req, res) => {
  try {
    const rooms = await inTheRoom.findAll();
    const result = [];

    rooms.forEach(room => {
      const amenities = {};

      if (room.wifi) amenities.wifi = 'Wi-Fi';
      if (room.conditioner) amenities.condition = 'Кондиционер';
      if (room.fridge) amenities.fridge = 'Холодильник';
      if (room.kitchen) amenities.kitchen = 'Кухня';
      if (room.balcony) amenities.balcony = 'Балкон';
      if (room.tv) amenities.tv = 'Телевизор';
        room.jacuzzi
      result.push({
        intheroom_id: room.intheroom_id,
        amenities
      });
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};
