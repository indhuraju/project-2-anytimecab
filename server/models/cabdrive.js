var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var driverSchema = mongoose.Schema({
  FirstName: String,
  DriverCity: String,
  // DriverAddress: String,
  MobileNumber: String,
  LicenseNumber: String,
  Password:String,
  Email:String,
  CarType:String,
  carNumber:String,
  carName:String
});
driverSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Decrypting Password
driverSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}
module.exports = mongoose.model('DriverData', driverSchema, 'DriverData');
