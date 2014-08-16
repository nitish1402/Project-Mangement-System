
//main javascript file

angular
.module('myApp',['ngRoute'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      access: { requiredLogin: false }
    //  controller: IndexCtrl
    }).
    when('/login',{
      templateUrl : 'partials/login',
      controller : AdminUserCtrl,
      access: { requiredLogin: false }
    }).
    when('/user',{
      templateUrl : 'partials/user/user',
      controller : userInfo,
      access: { requiredLogin: true }

    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
})
.run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredLogin && !AuthenticationService.isLogged) {
            $location.path("/login");
        }
    });
});
