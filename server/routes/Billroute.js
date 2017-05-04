var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var biling = require('../models/bill.js');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/bill', function(req, res) {
    var newBill = new biling();
   // newBill.customerId = req.body.customerId;
   newBill.SourceLocation = req.body.SourceLocation;
   newBill.DestinationLocation = req.body.DestinationLocation;
   newBill.CarTp = req.body.CarTp;
   newBill.carNumber = req.body.carNumber;
   newBill.carName = req.body.carName;
   newBill.name = req.body.name;
   newBill.mail = req.body.mail;
   newBill.Amount = req.body.Amount;
   newBill.mobile = req.body.mobile;

    newBill.save(function(err) {
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
            console.log('Cab Booked Saved');
        }
    });
});

router.get('/bill', function(req, res) {
    biling.find({}, function(err, docs) {
        res.json(docs);
    });
});

router.get('/bill/:id', function(req, res) {
    biling.find({
        '_id': req.params.id
    }, function(err, docs) {
        res.json(docs);
    });
});

router.delete('/bill/:id', function(req, res) {
    biling.remove({
        _id: req.params.id
    }, function(err, docs) {
        console.log('Booking Removed Successfully');
    });
});

module.exports = router;
