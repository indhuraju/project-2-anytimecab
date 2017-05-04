var mongoose = require('mongoose');
var ConfirmationSchema = mongoose.Schema({
  Cid:String,
    CPickupLocation:String,
   CDestinationLocation:String,
   CCarTp:String,
   CPickupDate:String,
   CPickTime:String,
   CAmount:String,
   Cname:String,
   Cmail:String,
   Cmobile:String
    
});

var Confirm = mongoose.model('ConfirmCab', ConfirmationSchema, 'ConfirmationTable');


