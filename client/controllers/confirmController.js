angular.module('myApp').controller('confirmController', function($scope,$rootScope,$location,$cookies,AuthenticationService,$http) {

  $scope.confirm=$rootScope.bookedCab;
  var refreshConfirm= function () {
        $http.get('/cnfm/cnfm').success(function (response) {
            console.log('cab Book READ IS SUCCESSFUL');
            alert("Your Booking is Success...Driver will contact you soon");
            $scope.cnfmlist = response;
            $scope.cnfm = "";
        });
    };

          // refreshConfirm();
    refreshConfirm();
   $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
            // if (response.data.success === true) {
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
     // $scope.Drivers.UserType="Driver"
     //    $http.post('/api/signup', $scope.Drivers).then(function(response) {
     //        // alert('Driver login SUCCESSFULLY');

     //        refreshDriver();
     //    });
              document.getElementById("mail").innerHTML=authUser.currentUser.userInfo.email;
              document.getElementById("numb").innerHTML=authUser.currentUser.userInfo.mobile;
              // document.getElementById("phne").innerHTML=authUser.currentUser.userInfo.mobile;


    $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
           // / if (response.data.success === true) {
                $location.path('/Login');

        });
    };
  $scope.ConfirmBook = function () {
    $scope.cnfm.Cid=$scope.confirm.ID;
    console.log(ID);
    $scope.cnfm.CPickupLocation=$scope.confirm.PickupLocation;
    $scope.cnfm.CDestinationLocation=$scope.confirm.DestinationLocation;
    $scope.cnfm.CCarTp=$scope.confirm.CarTp;
    $scope.cnfm.CPickupDate=$scope.confirm.PickTime;
    $scope.cnfm.CPickTime=$scope.confirm.Pickdate;
    $scope.cnfm.CAmount=$scope.confirm.Amount;
    $scope.cnfm.Cmail=authUser.currentUser.userInfo.email;
    $scope.cnfm.Cmobile=authUser.currentUser.userInfo.mobile;


console.log($scope.cnfm.Cmobile);

      $http.post('/cnfm/cnfm', $scope.cnfm).success(function (response) {
          console.log(response);
          console.log("Book CREATE IS SUCCESSFUL");
          alert("Booking Success...Driver will contact you soon");
          refreshConfirm();
      });


$location.path('/');
 }; 
})

