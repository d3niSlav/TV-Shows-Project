angular.module('RankingCtrl', []).controller('RankingController', ['$scope', '$interval', 'Ranking', function($scope, $interval, Ranking) {
    var currentShowIndex = 1;

    Ranking.getTopShows().then(function(res) {
        $scope.topThreeShows = res.data.slice(0, 3);

        $scope.topThreeShows[0].medal = "../images/gold.png";
        $scope.topThreeShows[1].medal = "../images/silver.png";
        $scope.topThreeShows[2].medal = "../images/bronze.png";

        $scope.topThreeShows[0].medalToken = "../images/gold-medal.png"
        $scope.topThreeShows[1].medalToken = "../images/silver-medal.png"
        $scope.topThreeShows[2].medalToken = "../images/bronze-medal.png"

        $scope.showOnFokus = $scope.topThreeShows[0];
        $scope.changeShow = changeShow;

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

    var changeShow = function(number) {
        currentShowIndex = number + 1;
        $scope.showOnFokus = $scope.topThreeShows[number];
    }

    function getIndex() {
        if (currentShowIndex > 2) {
            currentShowIndex = 0;
        }
        return currentShowIndex++;
    }

    startCarousel();

    $scope.pauseCarousel = function() {
        $interval.cancel(carousel);
    }

    function startCarousel() {
        carousel = $interval(function() {
            changeShow(getIndex());
        }, 4000);
    }
    $scope.startCarousel = startCarousel;

}]);