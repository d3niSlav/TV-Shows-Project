angular.module('UsersCtrl', []).controller('UsersController', ['$scope', '$location', 'Users', 'Main', function($scope, $location, Users, Main) {
    Main.getLoggedUserId().then(function(res) {
        if (JSON.parse(res.data).userId) $location.path('/');
    });
    $scope.formData = {};

    $scope.createUser = function() {
        if (!$.isEmptyObject($scope.formData)) {
            Users.create($scope.formData).then(function() {
                clearErrorsAndFields();
                $location.path('/login');
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
            Users.logIn($scope.formData).then(function(data) {
                clearErrorsAndFields();
                Main.getLoggedUserId().then(function(res) {
                    $scope.$parent.user.id = JSON.parse(res.data).userId;
                    $location.path('/');
                });
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