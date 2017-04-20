angular.module('ProfilesCtrl', []).controller('ProfilesController', ['$scope', 'Profiles', function($scope, Profiles) {
    Profiles.getUserProfile().then(function(res) {
        $scope.user = res.data;
    });
}]);