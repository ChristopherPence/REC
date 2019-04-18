console.log(app);
console.log('Navbar running');
app.controller('cookieCtrl', ['$cookies', function($cookies) {
    // Retrieving a cookie
    console.log("Hi");
    var favoriteCookie = $cookies.get('user');
    console.log(favoriteCookie);
}]);
