angular.module('AllShowsCtrl', []).controller('AllShowsController', ['$scope', 'AllShows', function($scope, AllShows) {
    AllShows.getAllShows().then(function(res) {
        $scope.shows = res.data;
    });
}]);