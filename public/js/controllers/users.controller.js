angular.module('UsersController', []).controller('UsersController', ['$rootScope', '$scope', '$location', '$routeParams', 'UsersService', 'MainService', function ($rootScope, $scope, $location, $routeParams,UsersService, MainService) {
    const REGISTRATION_PAGE_PATH = '/register';
    const LOGIN_PAGE_PATH = '/login';
    const PASSWORD_RESET_PAGE_PATH = '/reset-password/';
    const FORGOTTEN_PASSWORD_PAGE_PATH = '/forgotten-password';

    $scope.formData = {};
    $scope.isPasswordResetTokenSent = false;

    function clearErrorsAndFields() {
        $scope.hasError = {
            email: false,
            password: false,
            confirmPassword: false
        };
        $scope.formData = {};
    }

    function redirectUser(currentPath) {
        clearErrorsAndFields();
        MainService.getLoggedUserId().then(function (userId) {
            if (userId) {
                $rootScope.userId = userId;
                if ($location.url() === currentPath) {
                    $location.path('/');
                } else {
                    $rootScope.closePopupBox();
                }
            } else {
                $location.path(currentPath);
            }
        });
    }

    MainService.getLoggedUserId().then(function (userId) {
        if (userId && (
            $location.url() === LOGIN_PAGE_PATH ||
            $location.url() === REGISTRATION_PAGE_PATH ||
            $location.url().toString().includes(PASSWORD_RESET_PAGE_PATH) ||
            $location.url() === FORGOTTEN_PASSWORD_PAGE_PATH)
        ) {
            $location.path('/');
        }
    });

    $scope.createUser = function () {
        if (!$.isEmptyObject($scope.formData)) {
            UsersService.createNewUser($scope.formData).then(function () {
                redirectUser(REGISTRATION_PAGE_PATH);
            }).catch(function (e) {
                $scope.errors = e.data.error;
                $scope.hasError = {
                    email: e.data.error.email.length,
                    password: e.data.error.password.length,
                    confirmPassword: e.data.error.confirmPassword.length
                };
            });
        }
    };

    $scope.logInUser = function () {
        if (!$.isEmptyObject($scope.formData)) {
            UsersService.logIn($scope.formData).then(function () {
                redirectUser(LOGIN_PAGE_PATH);
            }).catch(function (e) {
                $scope.errors = e.data.error;
                $scope.hasError = {
                    email: e.data.error.email,
                    password: e.data.error.password
                };
            });
        }
    };

    $scope.getResetPasswordToken = function () {
        if (!$.isEmptyObject($scope.formData)) {
            UsersService.sendResetPasswordTokenRequest($scope.formData).then(function () {
                $scope.isPasswordResetTokenSent = true;
            }).catch(function (e) {
                $scope.errors = e.data.error;
                $scope.hasError = {
                    email: e.data.error
                };
            });
        }
    };

    $scope.setNewPassword = function () {
        if (!$.isEmptyObject($scope.formData)) {
            UsersService.setNewPassword($scope.formData, $routeParams.token).then(function () {
                $location.path(LOGIN_PAGE_PATH);
            }).catch(function (e) {
                $scope.errors = e.data.error;
                $scope.hasError = {
                    password: e.data.error.password,
                    confirmPassword: e.data.error.confirmPassword
                };
            });
        }
    };
}]);