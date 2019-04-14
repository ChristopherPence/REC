var lecookie = angular.module('navbar', ['ngCookies']);
    lecookie.controller('cookieCtrl', ['$cookies', function($cookies) {
        // Retrieving a cookie
        console.log("Hi");
        var favoriteCookie = $cookies.get('user');
        console.log(favoriteCookie);
    }]);

