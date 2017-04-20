angular.module('UsersCtrl', []).controller('UsersController', ['$scope', '$location', 'Users', function($scope, $location, Users) {
    $scope.formData = {};

    $scope.createUser = function() {
        if (!$.isEmptyObject($scope.formData)) {
            Users.create($scope.formData).then(function() {
                clearErrorsAndFields();
                $location.path('/');
            }).catch(function(e) {
                $scope.errors = e.data.error;
                $scope.errorClass = {
                    email: e.data.error.email.length ? "error" : "",
                    password: e.data.error.password.length ? "error" : "",
                    confirmPassword: e.data.error.confirmPassword.length ? "error" : ""
                };
            });
        }
    };

    $scope.logInUser = function() {
        if (!$.isEmptyObject($scope.formData)) {
            Users.logIn($scope.formData).then(function() {
                clearErrorsAndFields();
                $location.path('/');
            }).catch(function(e) {
                $scope.errors = e.data.error;
                $scope.errorClass = {
                    email: e.data.error.email ? "error" : "",
                    password: e.data.error.password ? "error" : "",
                };
            });
        }
    };

    function clearErrorsAndFields() {
        $scope.errorClass = {
            email: "",
            password: "",
            confirmPassword: ""
        };
        $scope.formData = {};
    }
}]);