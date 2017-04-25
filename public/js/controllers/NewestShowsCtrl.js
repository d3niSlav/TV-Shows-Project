angular.module('NewestShowsCtrl', []).controller('NewestShowsController', ['$scope', 'AllShows', function($scope, AllShows) {
    AllShows.getAllShowsByDate().then(function(res) {
        var newest = res.data.slice(0, 4);
        newest.forEach(function(show) {
            show.stars = createStars(show.imdbRating);
        });
        $scope.newestFourShows = newest;

        $scope.moreShows = res.data.slice(4, 7);

        var shows = res.data.slice(7, 11);
        shows.forEach(function(show) {
            show.stars = createStars(show.imdbRating);
        });
        $scope.otherShows = shows;

        function createStars(showRating) {
            var stars = new Array(10);
            stars.fill("star-o")

            var fullStarsCount = 0;

            for (var i = 0; i < Math.floor(showRating); i++) {
                stars[i] = "star";
                fullStarsCount++;
            }

            if ((showRating * 10) % 10 >= 5) {
                stars[fullStarsCount] = "star-half-o"
            }

            return stars;
        }
    });
}]);