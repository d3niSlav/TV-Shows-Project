angular.module('NewestShowsController', []).controller('NewestShowsController', ['$scope', 'AllShowsService', function($scope, AllShowsService) {
    AllShowsService.getAllShowsByDate().then(function(res) {
        var newestShows = res.data.slice(0, 11);
        newestShows.forEach(function(show) {
            show.stars = AllShowsService.createStars(show.imdbRating);
        });
        $scope.newShows = newestShows;
    });
}]);