//main javascript file

angular
.module('myApp',['ngRoute'])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index'
    //  controller: IndexCtrl
    }).
    when('/login',{
      templateUrl : 'partials/login'
      //
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
