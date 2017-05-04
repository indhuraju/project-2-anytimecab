var mongoose = require('mongoose');
var BillSchema = mongoose.Schema({
    customerId:String,
    SourceLocation:String,
   DestinationLocation:String,
   CarTp:String,
   PickupDate:String,
   PickTime:String,
   name:String,
   mail:String,
   Amount:String,
   mobile:String,
   carNumber:String,
   carName:String

});

module.exports = mongoose.model('Bills', BillSchema, 'Bills');
