angular.module('ContactUsController', []).controller('ContactUsController', ['$scope', '$location', 'ContactUsService', function($scope, $location, ContactUsService) {
    $scope.formData = {};
    $scope.createMessage = function() {
        if (!$.isEmptyObject($scope.formData)) {
            ContactUsService.sendMessage($scope.formData).then(function() {
                $scope.formData = {};
                $location.path('/');
            });
        }
    };
}]);