var express =require('express');
var mongoose = require('mongoose');
var router = express.Router();
var bodyParser=require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
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






router.get('/cnfm', function (req, res,next) {
   console.log("REACHED GET FUNCTION ON SERVER");

   Confirm.find({}, function (err, docs) {
        res.json(docs);
        // console.log(docs);

   });
});

router.get('/cnfm/:id', function (req, res) {
   console.log("REACHED GET ID FUNCTION ON SERVER");
    Confirm.find({_id: req.params.id}, function (err, docs) {
        res.json(docs);

   });
});

router.post('/cnfm', function(req, res){
 console.log(req.body);
 newcnfm.Cid = req.body.Cid;

   newcnfm.CPickupLocation = req.body.CPickupLocation;
   newcnfm.CDestinationLocation = req.body.CDestinationLocation;
   newcnfm.CCarTp = req.body.CCarTp;
   newcnfm.CPickupDate = req.body.CPickupDate;
   newBill.CPickTime = req.body.CPickTime;
   newcnfm.Cname = req.body.Cname;
   newcnfm.CAmount = req.body.CAmount;
   newcnfm.Cmail = req.body.Cmail;
   newcnfm.Cmobile = req.body.Cmobile;


 Confirm1.save(function(err, docs){
   if ( err ) throw err;
   console.log("cONFIRMATION Saved Successfully");
   res.json(docs);
 });

 })



router.delete('/cnfm/:id', function(req, res){
  console.log("REACHED Delete FUNCTION ON SERVER");
     Confirm.remove({_id:req.params.id}, function(err, docs){
       res.json(docs);
   });
})

router.put('/cnfm/:id', function(req, res){
   console.log("REACHED updation ");
   console.log(req.body);
   Confirm.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
     res.json(data);
   });
})

router.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});


module.exports = router;