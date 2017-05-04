var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var cabtypeSchema = mongoose.Schema({

    CarTp:String,
    NormalHourRate:String,
     PeakHourRate:String,
     StartPeakTime:String,
     EndPeakTime:String

     
});

module.exports = mongoose.model('cabtype', cabtypeSchema, 'cabtype');
