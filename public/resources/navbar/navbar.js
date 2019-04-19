console.log(app);
console.log('Navbar running');
app.controller('cookieCtrl', ['$cookies', '$scope', '$sce', function($cookies, $scope, $sce) {
    // Retrieving a cookie
    var favoriteCookie = $cookies.get('user');
    console.log(favoriteCookie);
    if (favoriteCookie == null){
        console.log('logged in');
        $scope.html = '<a href = "login-register.html" class = "nav right rounded">Club Login</a>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
    }
    else{
        console.log('logged out');
        $scope.html = '<span class="row"><a href = "profile.html" class = "nav right rounded">Profile</a>' + '<form method="post" action="/logout" class="form-inline my-2 my-lg-0"> <input type="submit" value="Log Out" class="form-control mr-sm-2"> </input></form></span>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);
    }
}]);