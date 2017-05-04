angular.module('myApp').controller('HomeController', function( AuthenticationService,$scope, $http,$location) {
 

   

   $scope.LoginUser = function() {
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true) {
                if(response.data.userDetail.UserType=="Customer" ){
                    $location.path('/Booking');
                }
                if(response.data.userDetail.UserType=="Driver")
                    $location.path('/Driver');
                }
                  if(response.data.userDetail.UserType=="Admin")
                    $location.path('/Admin');
                })
                
            
        }
        function validateform(){  
var mail=document.myform.mail.value;  
var password=document.myform.password.value;  
  
if (mail==null || mail==""){  
  alert("Name can't be blank");  
  return false;  
}else if(password.length<=8){  
  alert("Password must be at least 8 characters long.");  
  return false;  
  }  
}

 $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            // if (response.data.success === true) {
                $location.path('/Login');

        });
    };

    


});