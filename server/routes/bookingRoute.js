var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var booking = require('../models/Booking.js');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/bkcb', function(req, res) {
    var newBook = new booking();
    newBook.BookingID = req.body.BookingID;
   newBook.PickupLocation = req.body.PickupLocation;
   newBook.DestinationLocation = req.body.DestinationLocation;
   newBook.CarTp = req.body.CarTp;
   newBook.PickupDate = req.body.PickupDate;
   newBook.PickTime = req.body.PickTime;
   newBook.Amount = req.body.Amount;
   newBook.name = req.body.name;
   newBook.mail = req.body.mail;
   newBook.mobile = req.body.mobile;
    newBook.save(function(err) {
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

router.get('/bkcb', function(req, res) {
    booking.find({}, function(err, docs) {
        res.json(docs);
    });
});

router.get('/bkcb/:id', function(req, res) {
    booking.find({
        '_id': req.params.id
    }, function(err, docs) {
        res.json(docs);
    });
});

router.delete('/bkcb/:id', function(req, res) {
    booking.remove({
        _id: req.params.id
    }, function(err, docs) {
        console.log('Booking Removed Successfully');
    });
});

module.exports = router;
