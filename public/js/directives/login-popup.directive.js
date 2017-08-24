app.directive('login', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'E',

        scope: {
            ngModel: '=',
            switchPopUp: '='
        },

        templateUrl: './js/directives/login-popup.html',

        controller: 'UsersController',

        link: function (scope) {
            scope.switchToRegister = function () {
                $rootScope.isLoginPopupOpen = false;
            };

            scope.closePopUpBox = function () {
                $rootScope.closePopupBox();
            };
        }
    }
}]);