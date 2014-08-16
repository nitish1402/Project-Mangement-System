var options = {};
options.api = {};
options.api.base_url = "http://localhost:8080";

angular.module('myApp')
.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }

    return auth;
})
.factory('UserService', function($http) {
    return {
        logIn: function(username, password) {
            return $http.post(options.api.base_url + '/login', {username: username, password: password});
        },

        logOut: function() {

        }
    }
})
.factory('TokenInterceptor', function ($q, $window, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});
