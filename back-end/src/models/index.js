const client = require('./clientsModel');
const { rentAppartment, Booking } = require('./rentAppartmentsModel');
const payment = require('./paymentsModel');
const retail = require('./retailsModel');
const service = require('./servicesModel');
const near = require('./nearsModel');
const inTheRoom = require('./intheroomsModel');
const inTheTerritory = require('./intheterritoriesModel');
const distanceToTheSea = require('./distancetotheseasModel');
const numberOfRoom = require('./numberofroomsModels');
const Property = require('./propertiesModel')

// 📌 Client (1) --- (∞) RentAppartment
client.hasMany(rentAppartment, { foreignKey: 'client_id', as: 'rentals' });
rentAppartment.belongsTo(client, { foreignKey: 'client_id', as: 'client' });

Booking.belongsTo(client, { foreignKey: 'client_id' });
Booking.belongsTo(rentAppartment, { foreignKey: 'rentAppartment_id' });

// 📌 Client (1) --- (∞) Payment
client.hasMany(payment, { foreignKey: 'client_id', as: 'payments' });
payment.belongsTo(client, { foreignKey: 'client_id', as: 'client' });

// 📌 RentAppartment (1) --- (∞) Payment
rentAppartment.hasMany(payment, { foreignKey: 'booking_id', as: 'payments' });
payment.belongsTo(rentAppartment, { foreignKey: 'booking_id', as: 'rental' });

// 📌 Retail (1) --- (∞) RentAppartment
retail.hasMany(rentAppartment, { foreignKey: 'retail_id', as: 'rentals' });
rentAppartment.belongsTo(retail, { foreignKey: 'retail_id', as: 'retail' }); // Добавлено

// 📌 Retail (1) --- (1) inTheRoom, inTheTerritory, near, service, distanceToTheSea, numberOfRoom
retail.belongsTo(inTheRoom, { foreignKey: 'intheroom_id', as: 'inTheRoom' });
retail.belongsTo(inTheTerritory, { foreignKey: 'intheterritory_id', as: 'inTheTerritory' });
retail.belongsTo(near, { foreignKey: 'near_id', as: 'near' });
retail.belongsTo(service, { foreignKey: 'service_id', as: 'service' });
retail.belongsTo(distanceToTheSea, { foreignKey: 'distancetothesea_id', as: 'distanceToTheSea' });
retail.belongsTo(numberOfRoom, { foreignKey: 'numberofrooms_id', as: 'numberOfRoom' });

retail.belongsTo(Property, { foreignKey: 'property_id' })
Property.hasMany(retail, { foreignKey: 'property_id' })


module.exports = {
  client,
  rentAppartment,
  payment,
  retail,
  service,
  near,
  inTheRoom,
  inTheTerritory,
  distanceToTheSea,
  numberOfRoom,
  Booking,
  Property
}