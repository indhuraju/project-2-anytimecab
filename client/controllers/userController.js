angular.module('myApp').controller('userController', function($scope, $http,$location,$rootScope,$cookies,AuthenticationService) {
$scope.divdata=false;

$scope.laterDetails=false;
    $scope.calDisDetails=false;
 
var lat,long;
var map;
var marker;

var socket=io();
var customerlist=[];
ini();
var refreshbill=function(){
$http.get('/bill/bill').success(function (response) {
              console.log('cab Book READ IS SUCCESSFUL');
              $scope.list = response;
              $scope.l = {};
            });
}
refreshbill();
  $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
          
                $location.path('/Login');

        });
    };
    var loggedInUser;
  var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          }


  function initCustomer() {
          socket.emit('user',{
            latitude:lat,
  longitude:long,
            info:loggedInUser
           })
          console.log(data);
        }

function ini(){

if (navigator.geolocation)
 {
 navigator.geolocation.getCurrentPosition(function (p)
  { 
  var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
  lat=p.coords.latitude;
  long=p.coords.longitude;
  var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

var mapOptions = {
zoom: 18,
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

marker = new google.maps.Marker({
map: map,
position: latlng,
draggable: true 
}); 

geocoder.geocode({'latLng': latlng }, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
$('#latitude,#longitude').show();
$('#address').val(results[0].formatted_address);
$('#latitude').val(marker.getPosition().lat());
lat=document.getElementById("latitude").value;
// alert(lat);
$('#longitude').val(marker.getPosition().lng());
long=document.getElementById("longitude").value;
// alert(long);
infowindow.setContent(results[0].formatted_address);
infowindow.open(map, marker);
initCustomer();
}
}
});

google.maps.event.addListener(marker, 'dragend', function() {

geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
$('#address').val(results[0].formatted_address);
$('#latitude').val(marker.getPosition().lat());
lat=document.getElementById("latitude").value;
$('#longitude').val(marker.getPosition().lng());
long=document.getElementById("longitude").value;

infowindow.setContent(results[0].formatted_address);
infowindow.open(map, marker);
initCustomer();
}
}
});
});


});
}
else
{
  alert('Geo Location feature is not supported in this browser.');
}
}
var refreshType = function () {
        $http.get('/cartype/cartype').success(function (response) {
            console.log('Car READ IS SUCCESSFUL');
            $scope.typeslist = response;
            $scope.types = "";
        });
    };

    refreshType();


  init();

    function init() {

        var acInputs = document.getElementsByClassName("autocomplete");

        for (var i = 0; i < acInputs.length; i++) {

            var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);

            autocomplete.inputId = acInputs[i].id;
           
        }
    }



    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('ac1'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });




var details=[],l,m;
socket.on('driver',function(data){
details.push(data.Driverslist);
              console.log(details.length);
              for(l=0;l<details.length;l++)
              {

              console.log(details[l].lati);
              console.log(details[l].Longi);
                      marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(details[l].lati,details[l].Longi),
                                        draggable: true,
                                        map: map,
                                        icon: 'https://cdn1.iconfinder.com/data/icons/travel-and-holiday-2/130/_Taxi-128.png',
                                       title: 'Driver'
                                    })
              }

            })
 var refreshBook = function () {
          $http.get('/bkcb/bkcb').success(function (response) {
              console.log('cab Book READ IS SUCCESSFUL');
              $scope.bookedlist = response;
              $scope.booked = "";
          });
      };

      refreshBook();
var distance,duration,i,source,destination,cartype;

$scope.faredetails=function(){
   var date = new Date();
      var hour = date.getHours();
      var min = date.getMinutes();
      $scope.PickTime = hour+":"+min;
     source=document.getElementById("address").value;
    destination=document.getElementById("ac1").value
  console.log(details.length);
      if(details.length==0)
        {
         alert("sorry no cab available");
         $scope.divdata=false;
        }
          else{
for(m=0;m<details.length;m++){
if(details[m].type==$scope.booked.CarTp){
$scope.divdata=true;
var service = new google.maps.DistanceMatrixService();
       service.getDistanceMatrix({
           origins: [source],
           destinations: [destination],
           travelMode: google.maps.TravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem.METRIC,
           avoidHighways: false,
           avoidTolls: false
       }, function (response, status) {
           if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                distance = response.rows[0].elements[0].distance.text;
                duration = response.rows[0].elements[0].duration.text;
                document.getElementById("totalDist").innerHTML=distance;
document.getElementById("totalTime").innerHTML=duration;
                      var travelDist=parseFloat(distance);
            cartype=document.getElementById("selectedType").value;
           
      for(i=0;i<=$scope.typeslist.length;i++)
      {
     

 if($scope.typeslist[i].StartPeakTime>=$scope.PickTime|$scope.typeslist[i].EndPeakTime>=$scope.PickTime){
          
          console.log($scope.typeslist[i].PeakHourRate);
   var totalMoney=parseFloat(travelDist)*parseFloat($scope.typeslist[i].PeakHourRate);

 console.log(totalMoney);
      document.getElementById("totalfare").innerHTML=totalMoney;
      }
else{
 totalMoney=parseFloat(travelDist)*parseFloat($scope.typeslist[i].NormalHourRate);
        console.log(totalMoney);
      document.getElementById("totalfare").innerHTML=totalMoney;
        }
}
           } else {
              
           }
       });

}
else
{
   
}
}
}
};

$scope.confirm=function(){

  $scope.l.name=authUser.currentUser.userInfo.fname;
  $scope.l.mobile=authUser.currentUser.userInfo.mobile;
  $scope.l.mail=authUser.currentUser.userInfo.email;
  $scope.l.SourceLocation=source;
  $scope.l.DestinationLocation=destination;
 
  amount=document.getElementById("totalfare").innerHTML;
  $scope.l.Amount=amount;
  $scope.l.CarTp=cartype;

$http.post('/bill/bill', $scope.l).success(function (response) {
            console.log(response);



  socket.emit('customerdetails',{
  latitude:lat,
  longitude:long,
  name:authUser.currentUser.userInfo.fname,
  cabType:cartype,
  No:authUser.currentUser.userInfo.mobile,
  Amount:amount,
  source:$scope.l.SourceLocation,
  Destination:$scope.l.DestinationLocation,
  mail:authUser.currentUser.userInfo.email
  });



  alert("Your Cab is Booked..... Driver will contact soon");
 });
  
}
var j,fare;
var distance,duration,i,source,destination,cartype,travelDist;

    $scope.clickBookLater = function () {
     
      $scope.laterDetails=true;
       
      
};
$scope.ridelater=function(){
 
  $scope.calDisDetails=true;

    
                  source=document.getElementById("address").value;
      destination=document.getElementById("ac1").value;
      console.log($scope.booked.PickupLocation);
      console.log($scope.booked.DestinationLocation);
      $scope.booked.PickTime =document.getElementById("timeV").value;
      $scope.booked.Pickdate =document.getElementById("dateT").value;
  console.log(details.length);
      if(details.length==0)
        {
         
         $scope.calDisDetails=false;
        }
          else{
for(m=0;m<details.length;m++){
if(details[m].type==$scope.booked.CarTp){

var service = new google.maps.DistanceMatrixService();
       service.getDistanceMatrix({
           origins: [source],
           destinations: [destination],
           travelMode: google.maps.TravelMode.DRIVING,
           unitSystem: google.maps.UnitSystem.METRIC,
           avoidHighways: false,
           avoidTolls: false
       }, function (response, status) {
           if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                distance = response.rows[0].elements[0].distance.text;
                duration = response.rows[0].elements[0].duration.text;
      
                document.getElementById("totalDist1").innerHTML=distance;
document.getElementById("totalTime1").innerHTML=duration;
                      var travelDist=parseFloat(distance);
            cartype=document.getElementById("selectedType").value;
           $scope.calDisDetails=true;
      for(j=0;j<=$scope.typeslist.length;j++)
      {
        
         

 if($scope.typeslist[j].StartPeakTime>=$scope.PickTime|$scope.typeslist[j].EndPeakTime>=$scope.PickTime){
           
          console.log($scope.typeslist[j].PeakHourRate);
   var fare=parseFloat(travelDist)*parseFloat($scope.typeslist[j].PeakHourRate);

 console.log(fare);
 fare=parseFloat(travelDist)*parseFloat($scope.typeslist[j].NormalHourRate);
      document.getElementById("totalCabFare1").innerHTML=fare;
      }
else{
 
 fare=parseFloat(travelDist)*parseFloat($scope.typeslist[j].NormalHourRate);
        console.log(fare);
      document.getElementById("totalCabFare1").innerHTML=fare;

        }
}
           } else {
               // alert("Unable to find the distance via road.");
           }
       });

}
else
{
   // alert("Sorry,No matched cab Type is available for Drive");
}
}
}
};
var amt;
$scope.confirmlater=function(){
  $scope.booked.name=authUser.currentUser.userInfo.fname;
  $scope.booked.mobile=authUser.currentUser.userInfo.mobile;
  $scope.booked.mail=authUser.currentUser.userInfo.email;
  $scope.booked.PickupLocation=source;
  $scope.booked.DestinationLocation=destination;
  amt=document.getElementById("totalCabFare1").innerHTML;
  $scope.booked.Amount=amt;
  $scope.booked.CarTp=cartype;
console.log( $scope.booked);
$http.post('/bkcb/bkcb', $scope.booked).success(function (response) {
            console.log(response); 

});

};


socket.on('newDriverMessage',function(data) {

            console.log(data.id);
             var modal = document.getElementById('my');
   console.log(data);
   if(data!=null)
   {
     modal.style.display = "block";
     document.getElementById("DetailsName").innerHTML=data.driverNewDetails.fname;
  document.getElementById("bkid").innerHTML=data.driverNewDetails.email;
  document.getElementById("name").innerHTML=data.driverNewDetails.mobile;
 
}

      })

$scope.confirmlaterBooking=function(){
      clicked='BK' + Math.random().toString(10).substr(2,5);
    $scope.booked.ID=clicked;
     $scope.booked.name=authUser.currentUser.userInfo.fname;
  $scope.booked.mobile=authUser.currentUser.userInfo.mobile;
  $scope.booked.mail=authUser.currentUser.userInfo.email;
  $scope.booked.PickupLocation=source;
  $scope.booked.DestinationLocation=destination;
  amt=document.getElementById("totalCabFare1").innerHTML;
  $scope.booked.Amount=amt;
  

              console.log($scope.booked);
              $http.post('/bkcb/bkcb', $scope.booked).success(function (response) {
                  console.log(response);
                  console.log("Book CREATE IS SUCCESSFUL");

                          $rootScope.bookedCab=$scope.booked;
                      $location.path('/confirm');
              });


    }


$scope.submit=function(){
$location.path('/');
}
});