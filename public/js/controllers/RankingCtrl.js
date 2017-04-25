angular.module('RankingCtrl', []).controller('RankingController', ['$scope', 'Ranking', function($scope, Ranking) {
    Ranking.getTopShows().then(function(res) {
        $scope.topThreeShows = res.data.slice(0, 3);
        $scope.topThreeShows[0].medal = "../images/gold.png";
        $scope.topThreeShows[1].medal = "../images/silver.png";
        $scope.topThreeShows[2].medal = "../images/bronze.png";

        $scope.nextThreeShows = res.data.slice(3, 6);

        var shows = res.data.slice(6);
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