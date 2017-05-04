var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var CabDriver = require('../models/cabdrive.js');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/d', function(req, res) {
    var newDriver = new CabDriver();
   newDriver.FirstName = req.body.FirstName;
    // newDriver.DriverCity = req.body.DriverCity;
   newDriver.DriverAddress = req.body.DriverAddress;
   newDriver.MobileNumber = req.body.MobileNumber;
   newDriver.LicenseNumber = req.body.LicenseNumber;
   newDriver.Password = newDriver.generateHash(req.body.Password);
   newDriver.Email =  req.body.Email;
   newDriver.CarType = req.body.CarType;
   newDriver.carNumber = req.body.carNumber;
   newDriver.carName = req.body.carName;
    newDriver.save(function(err) {
        if (err) {
            console.log('Error in Saving user: ' + err);
            throw err;
            res.json({
                success: false
            });
        } else {
            res.json({
                success: true
            });
            console.log('driver Saved');
        }
    });
});

router.get('/d', function(req, res) {
    CabDriver.find({}, function(err, docs) {
        res.json(docs);
    });
});

router.get('/d/:id', function(req, res) {
    CabDriver.find({
        '_id': req.params.id
    }, function(err, docs) {
        res.json(docs);
    });
});

router.delete('/d/:id', function(req, res) {
    CabDriver.remove({
        _id: req.params.id
    }, function(err, docs) {
        console.log('Driver Removed Successfully');
    });
});

router.put('/d/:id', function(req, res) {
    CabDriver.findOneAndUpdate({
        _id: req.params.id
    }, req.body,function(err, docs) {
        res.json(docs);
        console.log('Driver Removed Successfully');
    });
});

module.exports = router;
