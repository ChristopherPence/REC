console.log(app);
console.log('Navbar running');
app.controller('cookieCtrl', ['$cookies', '$scope', '$sce', function($cookies, $scope, $sce) {
    // Retrieving a cookie
    var favoriteCookie = $cookies.get('user');
    console.log(favoriteCookie);
    if (favoriteCookie == null){
        console.log('logged in');
        $scope.html = '<h1> HI </h1>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
        //self.NAVPART = $sce.trustAsHtml();
            // '<a href = "login-register.html" class = "nav right rounded">Club Login</a>'
    }
    else{
        console.log('logged out');
        $scope.html = '<h1> HI PT 2 </h1>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
       //self.NAVPART = $sce.trustAsHtml('<h1> HI PT 2 </h1>');
            //'<a href = "profile.html" class = "nav right rounded">Profile</a>' + '<a href = "profile.html" class = "nav right rounded">Log Out</a>'
    }
}]);