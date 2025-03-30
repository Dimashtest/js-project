const client = require('./clientsModel');
const { rentAppartment, Booking } = require('./bookingsModel');
const payment = require('./paymentsModel');
const Retail = require('./retailsModel');
const service = require('./servicesModel');
const near = require('./nearsModel');
const inTheRoom = require('./intheroomsModel');
const inTheTerritory = require('./intheterritoriesModel');
const distanceToTheSea = require('./distancetotheseasModel');
const numberOfRoom = require('./numberofroomsModels');
const Property = require('./propertiesModel')
const Location = require('./locationsModel');

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
Retail.hasMany(rentAppartment, { foreignKey: 'retail_id', as: 'rentals' });
rentAppartment.belongsTo(Retail, { foreignKey: 'retail_id', as: 'retail' }); // Добавлено


Retail.belongsTo(Property, { foreignKey: 'property_id' })
Property.hasMany(Retail, { foreignKey: 'property_id' })

Property.belongsTo(Location, { foreignKey: 'location_id', as: 'Location' })
Location.hasMany(Property, { foreignKey: 'location_id', as: 'Properties' })

Property.hasMany(Retail, { foreignKey: 'property_id', as: 'retails' });
Retail.belongsTo(Property, { foreignKey: 'property_id', as: 'property' });


module.exports = {
  client,
  rentAppartment,
  payment,
  Retail,
  Booking,
  Property,
  Location
}