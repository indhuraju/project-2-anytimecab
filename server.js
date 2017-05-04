var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var UserRoute = require('./server/routes/userRoute.js');
var Cabdriver = require('./server/routes/Cabdriver.js');
var CabType = require('./server/routes/Cabtype.js');
var bookingRoute = require('./server/routes/bookingRoute.js');
var confirmRoute = require('./server/routes/confirm-crud.js');
var BillRoute = require('./server/routes/Billroute.js');
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './client')));
mongoose.connect('mongodb://localhost:27017/jwtauth');

var customer=[];
var customerlist=[];
var Driverslist=[];
var latitude,longitude;

var l;
var db = mongoose.connection;

db.on('open', function() {
    console.log('App is connected to database');
});

db.on('error', function(err) {
    console.log(err);
});
io.on('connection',function(socket){

  console.log("socket connected");
  console.log(socket.id);

  socket.on('user',function(data){
  console.log("reached customer details");

console.log(data);
  customer[socket.id] = {
lat:data.latitude,
long:data.longitude,
Name:data.info.fname,
email:data.info.email,
phone:data.info.mobile,
idNo:socket.id


  };
  console.log(customer);
  // console.log(customerlist);
socket.broadcast.emit('customer',{customerList:customer[socket.id]});

})


socket.on('user',function(data)
{
 console.log(data);

customerlist[socket.id]={
 lat:data.latitude,
long:data.longitude,
id:socket.id
};
console.log("customer added");


})

  socket.on('init',function(data)
{
 console.log(data);
console.log(socket.id);
Driverslist[socket.id]={
  lati:data.latitude,
  Longi:data.Longitude,
  Name:data.Dname,
  type:data.cab,
  pnone:data.No,
  carno:data.cno,
  carname:data.cname,
Email:data.mail,
id:socket.id
};
console.log("driver added");

console.log(Driverslist);
socket.broadcast.emit('driver',{Driverslist:Driverslist[socket.id]});

})

  

socket.on('customerdetails',function(data){
  console.log(data);
console.log(data.cabType);

for(t in customer){
  console.log(customer[t]);
  console.log(customer[t].email);
  if(data.mail==customer[t].email){
    console.log("customer confirmed");


    for(s in Driverslist){

  if(data.cabType==Driverslist[s].type){

    console.log(Driverslist[s].id);
 
    console.log("reached target in server inner");

    socket.to(Driverslist[s].id).emit('newCustomerMessage', {
      message:data,
      messageId:customer[t].idNo
  

      });
  }}

    console.log("details sent ot driver");


  }
    }
  })

socket.on('driverMessage',function(data){

  console.log(data);
  console.log("socket data");
  console.log(data.id);
  console.log("object id");
  console.log(data.ID);
  console.log(data.driverDetails);
console.log("userdetails received");

socket.to(data.ID).emit('newDriverMessage', {
  
  driverNewDetails:data.driverDetails
});


});
})



app.use('/api', UserRoute);
app.use('/d', Cabdriver);
app.use('/cartype', CabType);
app.use('/bkcb', bookingRoute);
app.use('/bill', BillRoute);
app.use('/cnfm', confirmRoute);




server.listen(8500, function(req, res) {
    console.log('Server is running on port 8500...');
});
