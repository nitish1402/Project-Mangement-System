'use strict'

function loginCtrl($scope,$location){

  /*
  $scope.user = "nitish";
  $scope.password = 123;
  */


  $scope.test = "Hello World!!"

  $scope.checkLogin = function() {

    alert("i am here");
    console.log("i am here");

  if($scope.user=="nitish" && $scope.password==123)
  {
    $location.path('/');
  }

  else
  {
    $location.path('/');
  }
}


}

function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService) {

        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService.logIn(username, password).success(function(data) {
                  console.log("logged");
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/user");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }

        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
}
