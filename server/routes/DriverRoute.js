var express = require('express');
var router = express.Router();
var CabDriver = require('../models/cabdrive.js');
var jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    var newDriver = new CabDriver();
   newDriver.DriverName = req.body.DriverName;
   newDriver.DriverAddress = req.body.DriverAddress;
   newDriver.MobileNumber = req.body.MobileNumber;
   newDriver.LicenseNmber = req.body.LicenseNmber;
   newDriver.Password = newDriver.generateHash(req.body.Password);
    newDriver.save(function(err) {
        if (err) {
            res.json(err);
        } else {
            res.json({
                success: true
            });
            console.log('Signup API Called');
        }
    });
});

router.post('/driverLogin', function(req, res) {
   
    DriverData.findOne({
        MobileNumber: req.body.MobileNumber
    }, function(err,driver) {
        if (err) {
            res.json(err);
        } else if (!driver) {
            res.json({
                success: false,
                message: 'Sorry wrong mobile Number'
            });
            console.log('Wrong number');
        } else if (!driver.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong mobile Number'
            });
            console.log('Wrong Password');
        } else if (driver) {
            var token = jwt.sign(driver, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                driverDetail: driver
            });
            console.log(token);
            console.log('Toke Created');
        }
    });
});

module.exports = router;
