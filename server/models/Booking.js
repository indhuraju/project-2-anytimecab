var mongoose = require('mongoose');
var BookingSchema = mongoose.Schema({
    BookingID: String,
    PickupLocation: String,
    DestinationLocation: String,
    CarTp: String,
    PickupDate: Date,
    PickTime: String,
    Amount: String,
    name:String,
    mobile:String,
    mail:String
    
});

module.exports = mongoose.model('Bookings', BookingSchema, 'Bookings');
