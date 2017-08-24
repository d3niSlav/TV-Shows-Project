angular.module('MainController', []).controller('MainController', ['$rootScope', '$scope', '$route', '$location', 'MainService', function ($rootScope, $scope, $route, $location, MainService) {
    $scope.isMobileMenuOpen = false;

    MainService.getLoggedUserId().then(function (userId) {
        $rootScope.userId = userId;
    });

    $scope.toggleMobileMenu = function () {
        $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
    };

    $scope.logoutAction = function () {
        MainService.logoutUser().then(function (res) {
            $rootScope.userId = '';
            $location.path('/');
        });
    };

    $rootScope.isPopUpBoxOpen = false;
    $rootScope.isLoginPopupOpen = true;

    $rootScope.openPopupBox = function () {
        $rootScope.isPopUpBoxOpen = true;
        $rootScope.isLoginPopupOpen = true;
    };

    $rootScope.closePopupBox = function () {
        $rootScope.isPopUpBoxOpen = false;
        MainService.getLoggedUserId().then(function (userId) {
            $rootScope.userId = userId;
        });
    };

    $rootScope.switchPopUp = function () {
        $rootScope.isLoginPopupOpen = !$rootScope.isLoginPopupOpen;
    };
}]);