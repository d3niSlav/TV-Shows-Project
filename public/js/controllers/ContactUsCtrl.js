angular.module('ContactUsCtrl', []).controller('ContactUsController', ['$scope', '$location', 'ContactUs', function($scope, $location, ContactUs) {
    $scope.formData = {};

    $scope.createMessage = function() {
        console.log('Vleza');
        if (!$.isEmptyObject($scope.formData)) {
            ContactUs.sendMessage($scope.formData).then(function() {
                $scope.formData = {};
                $location.path('/');
            });
        }
    };
}]);