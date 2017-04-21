angular.module('MainCtrl', []).controller('MainController', ['$scope', function($scope) {
    $scope.mobileButtonClick = function() {
        $('#mobile-nav-btn').toggleClass("is-active");
        $('#mobile-logo').toggleClass("hide");
        $('#mobile-menu').toggleClass("hide");
    }
}]);