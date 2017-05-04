var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngStorage']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/Home.html',
        controller: 'HomeController'
    })
    .when('/Login', {
        templateUrl: 'views/Login.html',
        controller: 'LoginController'
    }).when('/Register', {
        templateUrl: 'views/Register.html',
        controller: 'RegisterController'
    }).when('/Booking', {
        templateUrl: 'views/Booking.html',
        controller: 'userController'
    }).when('/Profile', {
        templateUrl: 'views/Profile.html'
    }).when('/Admin', {
        templateUrl: 'views/Admin.html',
        controller:'AdminController'

    }).when('/Driver', {
        templateUrl: 'views/Driver.html',
        controller:'DriverController'

    }).when('/profile1', {
        templateUrl: 'views/profile1.html',
         controller:'profileController'
      }).when('/confirm', {
        templateUrl: 'views/confirm.html',
         controller:'confirmController'
      }).when('/navbar', {
        templateUrl: 'views/navbar.html',
         controller:'NavController'
      })


});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/Login', '/Register'];
        var Adminpages = ['/','/Admin','/Login'];
        var CustomerPages = ['/','/Booking','/Login','/confirm'];
        var DriverPages = ['/','/Driver','/Login'];
var authUser = $cookies.getObject('authUser');
          if (authUser != undefined) {
              var loggedInUser = authUser.currentUser.userInfo;
              console.log(loggedInUser);
          }
          var restrictedPage = publicPages.indexOf($location.path()) === -1;
          if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
              $location.path('/Login');
          } else {
              if (authUser != undefined) {
                  if (authUser.currentUser.userInfo.usertype == 'Admin') {
                      var Admin = Adminpages.indexOf($location.path()) === -1;
                      if (Admin) {
                          $location.path('/Unauthorized');
                      }
                  }
                  if (authUser.currentUser.userInfo.usertype == 'Customer') {
                      var Customer = CustomerPages.indexOf($location.path()) === -1;
                      if (Customer) {
                          $location.path('/Unauthorized');
                      }
                  }
                  if (authUser.currentUser.userInfo.usertype == 'Driver') {
                      var Driver = DriverPages.indexOf($location.path()) === -1;
                      if (Driver) {
                          $location.path('/Unauthorized');
                      }
                  }
              }
          }
    });
});
