
angular.module('myApp').factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    // service.driverLogin = driverLogin;

    return service;

    function Login(user, callback) {
        $http.post('/api/Login', user)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo: {
                                id: response.data.userDetail._id,
                                email: response.data.userDetail.Email,
                                fname: response.data.userDetail.FirstName,
                                // lname: response.data.userDetail.LastName,
                                mobile: response.data.userDetail.MobileNumber,
                                usertype: response.data.userDetail.UserType

                                   
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    console.log(obj);
                    callback(response);
                } else {
                    callback(response);
                }
            });
    }
     function Logout() {
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');

    }
 // function driverLogin(driver, callback) {
 //        $http.post('/driverapi/driverLogin', driver)
 //            .then(function(response) {
 //                if (response.data.success && response.data.token) {
 //                    $sessionStorage.tokenDetails = {
 //                        token: response.data.token
 //                    };
 //                    $http.defaults.headers.common.Authorization = response.data.token;
 //                    var obj = {
 //                        currentdriver: {
 //                            isLoggedIn: true,
 //                            driverInfo: {
 //                                id: response.data.driverDetail._id,
 //                                name: response.data.driverDetail.DriverName,
 //                                addr: response.data.driverDetail.DriverAddress,
 //                                mobile: response.data.driverDetail.MobileNumber,
 //                                license: response.data.driverDetail.License,
 //                                password: response.data.driverDetail.Password
 //                            }
 //                        }
 //                    };
 //                    $cookies.putObject('authdriver', obj);
 //                    callback(response);
 //                } else {
 //                    callback(response);
 //                }
 //            });
 //    }

    // function Logout() {
    //     delete $sessionStorage.tokenDetails;
    //     $http.defaults.headers.common.Authorization = '';
    //     $cookies.remove('authdriver');

    // }
}
