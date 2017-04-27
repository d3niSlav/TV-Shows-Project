angular.module('MainCtrl', []).controller('MainController', ['$scope', '$route', '$timeout', 'Main', function($scope, $route, $timeout, Main) {
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
            // userId = "";
        });
    });

    $('#mobileLogoutBtn').click(function() {
        Main.logoutUser().then(function(res) {
            $scope.user.id = "";
            // userId = "";
        });
    });
}]);