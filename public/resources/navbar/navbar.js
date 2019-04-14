var lecookie = angular.module('navbar', ['ngCookies']);
    lecookie.controller('cookieController', ['$cookies', function($cookies) {
        // Retrieving a cookie
        var favoriteCookie = $cookies.get('user');
        console.log(favoriteCookie);
    }]);

