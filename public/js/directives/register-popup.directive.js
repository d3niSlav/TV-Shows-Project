app.directive('register', [ '$rootScope', function ($rootScope) {
    return {
        restrict: 'E',

        scope: {
            ngModel: '='
        },

        templateUrl: './js/directives/register-popup.html',

        controller: 'UsersController',

        link: function (scope) {
            scope.switchToLogIn = function () {
                $rootScope.isLoginPopupOpen = true;
            };

            scope.closePopUpBox = function () {
                $rootScope.isPopUpBoxOpen = false;
            };
        }
    };
}]);