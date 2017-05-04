var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cabtypes = require('../models/Cab.js');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/cartype', function(req, res) {
    var newCab = new Cabtypes();
   newCab.CarTp = req.body.CarTp;
   newCab.Free = req.body.Free;
   newCab.NormalHourRate = req.body.NormalHourRate;
   newCab.PeakHourRate = req.body.PeakHourRate;
   newCab.StartPeakTime = req.body.StartPeakTime;
   newCab.EndPeakTime = req.body.EndPeakTime;
    newCab.save(function(err) {
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

router.get('/cartype', function(req, res) {
    Cabtypes.find({}, function(err, docs) {
        res.json(docs);
    });
});

router.get('/cartype/:id', function(req, res) {
    Cabtypes.find({
        '_id': req.params.id
    }, function(err, docs) {
        res.json(docs);
    });
});

router.delete('/cartype/:id', function(req, res) {
    Cabtypes.remove({
        _id: req.params.id
    }, function(err, docs) {
        console.log('Driver Removed Successfully');
        res.json(docs);
    });
});

module.exports = router;
