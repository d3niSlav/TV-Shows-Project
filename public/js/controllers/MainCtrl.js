angular.module('MainCtrl', []).controller('MainController', ['$scope', '$route', '$location', 'Main', 'SingleShow', function($scope, $route, $location, Main, SingleShow) {
    $scope.user = {
        id: ""
    };

    Main.getLoggedUserId().then(function(res) {
        $scope.user.id = JSON.parse(res.data).userId;
        console.log($scope.user.id);
    });

    $scope.mobileButtonClick = function() {
        $('#mobile-nav-btn').toggleClass("is-active");
        $('#mobile-logo').toggleClass("hide");
        $('#mobile-menu').toggleClass("hide");
    }

    $('#logoutBtn').click(function() {
        Main.logoutUser().then(function(res) {
            $scope.user.id = "";
            SingleShow.clearUserData();

            if ($location.path().includes('/profile')) {
                $location.path('/');
            }
        });
    });

    $('#mobileLogoutBtn').click(function() {
        Main.logoutUser().then(function(res) {
            $scope.user.id = "";
            SingleShow.clearUserData();

            if ($location.path().includes('/profile')) {
                $location.path('/');
            }
        });
    });
}]);