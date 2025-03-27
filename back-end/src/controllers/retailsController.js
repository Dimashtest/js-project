const Retail = require('../models/retailsModel')

exports.getAllRetails = async (req, res) => {
  try {
    const retails = await Retail.findAll()
    res.json(retails)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка сервера' })
  }
}

exports.createRetail = async (req, res) => {
  const { numberofrooms_id, distancetothesea_id, intheroom_id, intheteretory_id, near_id, rules_id, service_id, name } = req.body
  try {
    const newRetail = await Retail.create({
      numberofrooms_id,
      distancetothesea_id,
      intheroom_id,
      intheteretory_id,
      near_id,
      rules_id,
      service_id,
      name
    })
    res.json(newRetail)
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании объекта' })
  }
}