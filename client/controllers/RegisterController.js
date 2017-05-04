angular.module('myApp').controller('RegisterController', function($scope, $http) {
    $scope.RegisterUser = function() {
    	$scope.User.UserType="Customer"
        $http.post('/api/signup', $scope.User).then(function(response) {
            alert('User Registration Successful');
                   $state.go('Login');


        });
    }
//       function validateform(){  
// var password=document.myform.password.value;  
// var confirm password=document.myform.confirm password.value;
// if (password==null || password==""){  
//   alert("password is wrong");  
//   return false;  
// }else if(password.length<8){  
//   alert("Password must be at least 6 characters long.");  
//   return false;  
//   }  
// } 
    //     $scope.RegisterUser = function() {
    //     $scope.User.UserType="Admin"
    //     $http.post('/api/signup', $scope.User).then(function(response) {
    //         alert('User Registration Successful');
    //                $state.go('Login');

    // })

});
