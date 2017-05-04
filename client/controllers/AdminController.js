angular.module('myApp').controller('AdminController', function($scope, $http) {

 $scope.LogoutUser = function() {
        AuthenticationService.Logout(function(response) {
                $location.path('/Login');

        });
    };
    
    var refreshDriver = function () {
        $http.get('/d/d').success(function (response) {
            console.log('Driver READ IS SUCCESSFUL');
            $scope.Driverslist = response;
            $scope.Drivers = "";
        });
    };

    refreshDriver();

      $scope.addDriver = function () {
        console.log($scope.Drivers);
        $http.post('/d/d', $scope.Drivers).success(function (response) {
            console.log(response);
            $scope.Drivers.UserType="Driver"
        $http.post('/api/signup', $scope.Drivers).then(function(response) {

            refreshDriver();
        });
          
        });
    };


    $scope.removeDriver = function (id) {
        console.log(id);
        $http.delete('/d/d/' + id._id).success(function (response) {
            console.log(response);
            console.log('DRIVER IS DELETED SUCCESSFULLY');
           refreshDriver();
        });
    };

    $scope.editDriver = function (id) {
         $http.get('/d/d/' + id._id).success(function (response) {
            $scope.Drivers = response[0];
        });
    };

    $scope.updateDriver = function () {
        console.log("REACHED UPDATE");
        console.log($scope.Drivers._id);
        $http.put('/d/d/' + $scope.Drivers._id, $scope.Drivers).success(function (response) {
            console.log(response);
            refreshDriver();
        });
    };



  var refreshType = function () {
        $http.get('/cartype/cartype').success(function (response) {
            console.log('Car READ IS SUCCESSFUL');
            $scope.typeslist = response;
            $scope.types = "";
        });
    };

    refreshType();

      $scope.addType = function () {
         $scope.types.StartPeakTime=document.getElementById("time1").value;
    $scope.types.EndPeakTime=document.getElementById("time2").value;
        console.log($scope.types);
        $http.post('/cartype/cartype', $scope.types).success(function (response) {
            console.log(response);
            console.log("CAR  IS ADDED SUCCESSFUL");
            refreshType();
        });
    };


    $scope.removeType = function (id) {
        console.log(id);
        $http.delete('/cartype/cartype/' + id._id).success(function (response) {
            console.log(response);
            console.log('CAR IS DELETED SUCCESSFULLY');
           refreshType();
        });
    };

    $scope.editType = function (id) {
         $http.get('/cartype/cartype/' + id._id).success(function (response) {
            $scope.types = response[0];
        });
    };

    $scope.updateType = function () {
        console.log("REACHED UPDATE");
        console.log($scope.types._id);
        $http.put('/cartype/cartype/' + $scope.types._id, $scope.types).success(function (response) {
            console.log(response);
            refreshType();
        });
    };

});
