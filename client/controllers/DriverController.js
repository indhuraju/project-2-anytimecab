angular.module('myApp').controller('DriverController', function($scope, $http, $rootScope,$location,$cookies,AuthenticationService) {
 $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            
                $location.path('/Login');

        });
    };
 var socket = io();
 $scope.NowRidecustomer=false;
                
var lat,long;
var map;
var marker;

var Driverslist=[];
var loggedInUser;
  var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          }

    var refreshDriver1 = function () {
        $http.get('/d/d').success(function (response) {
            console.log('Driver READ IS SUCCESSFUL');
            $scope.Driverslist = response;
            $scope.Drivers = "";
        });
    };

    refreshDriver1();
init();

function init(){

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
draggable: true,

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
}
}
});
});
refreshDriver();

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


    var directionsService = new google.maps.DirectionsService();
    google.maps.event.addDomListener(window, 'load', function () {
        new google.maps.places.SearchBox(document.getElementById('ac1'));
        directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
    });


 var details1=[],l,m;
socket.on('customer',function(data){
details1.push(data.customerList);
              console.log(details1.length);
              for(l=0;l<details1.length;l++)
              {

              console.log(details1[l].lat);
              console.log(details1[l].long);
                      marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(details1[l].lat,details1[l].long),
                                        draggable: false,
                                        map: map,
                                        icon: 'https://cdn0.iconfinder.com/data/icons/users-android-l-lollipop-icon-pack/24/user-128.png',
                                       title: 'customer'
                                    })
              }

            })
  

var name,cabType,contactno,carno,carname,email,j;
// var lat,Long;
  function refreshDriver() {
        $http.get('/d/d').success(function (response) {
            console.log('Driver READ IS SUCCESSFUL');
            $scope.Driverslist = response;
            $scope.Drivers = "";
            for(j=0;j<$scope.Driverslist.length;j++)
                      {
                      if($scope.Driverslist[j].Email==loggedInUser.email)
                      {
                      name=$scope.Driverslist[j].DriverName;
                      cabType=$scope.Driverslist[j].CarType;
                      contactno=$scope.Driverslist[j].MobileNumber;
                      carno=$scope.Driverslist[j].carNumber;
                      carname=$scope.Driverslist[j].carName;
                      email=$scope.Driverslist[j].Email;
                   
                      console.log(lat);
                     
                      console.log(long);

                      socket.emit('init', {

                      latitude:lat,
                     
                      Longitude:long,
                     
                      Dname:name,
                      cab:cabType,
                      No:contactno,
                      cno:carno,
                      cname:carname,
                      mail:email
        });
  
        }

    }
  });
 }


var userID;

      
        socket.on('newCustomerMessage',function(data){
   
  console.log(data);

             var modal = document.getElementById('my');
   console.log(data);
   if(data!=null)
   {
     modal.style.display = "block";
  var Name=data.message.name;
  document.getElementById("customerNameContainer").innerHTML=Name;
  document.getElementById("customerSourceContainer").innerHTML=data.message.source;
  document.getElementById("customerDestinationContainer").innerHTML=data.message.Destination;
  document.getElementById("customerNoContainer").innerHTML=data.message.No;
  document.getElementById("customerAmountContainer").innerHTML=data.message.Amount;

   userID=data.messageId;
 }

})
      

      var i,j,k;
      var Driver = [];
      var DriverDetail = [];


    
        socket.on('driverMessage',function(data){
         details.push(data.Driverslist); 

           {
      for(j=0;j<=$scope.driverlist.length;j++){
      
      if($scope.driverlist[j].Email==authUser.currentUser.userInfo.email){
      
          $scope.driver=$scope.driverlist[j];
        

      }}
      }
    })

       
$scope.NowRidecustomer=true;
  
var refreshbill=function(){

$http.get('/bill/bill').success(function (response) {
              console.log('cab Book READ IS SUCCESSFUL');
              $scope.list = response;
              $scope.m = {};
            });
}
refreshbill();

$scope.sendtoCustomer=function(){
  
  
   $scope.m.name=authUser.currentUser.userInfo.fname;
  $scope.m.mobile=authUser.currentUser.userInfo.mobile;
  $scope.m.mail=authUser.currentUser.userInfo.email;
  $scope.m.SourceLocation=document.getElementById("customerSourceContainer").innerHTML;
  $scope.m.DestinationLocation=  document.getElementById("customerDestinationContainer").innerHTML;
  amount=document.getElementById("customerAmountContainer").innerHTML;
  $scope.m.Amount=document.getElementById("customerAmountContainer").innerHTML;
 
socket.emit('driverMessage',{
   driverDetails:loggedInUser,
   name:$scope.m.name,
  cabType:$scope.m.CarTp,
  No:authUser.currentUser.userInfo.mobile,
  Amount:$scope.m.Amount,
  source:$scope.m.SourceLocation,
  Destination:$scope.m.DestinationLocation,
  mail:authUser.currentUser.userInfo.email,
  ID:userID

   })
alert("Your Details sent to customer");

};


});
