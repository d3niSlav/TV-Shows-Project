angular.module('RankingController', []).controller('RankingController', ['$scope', '$interval', 'AllShowsService', function($scope, $interval, AllShowsService) {
    var medals = [
        {
            description: 'First place',
            medalImageURL: '../images/gold_medal.png',
            ribbonImageURL: '../images/gold_ribbon.png'
        },
        {
            description: 'Second place',
            medalImageURL: '../images/silver_medal.png',
            ribbonImageURL: '../images/silver_ribbon.png'
        },
        {
            description: 'Third place',
            medalImageURL: '../images/bronze_medal.png',
            ribbonImageURL: '../images/bronze_ribbon.png'
        }
    ];

    var currentShowIndex = 1;
    var carousel;

    function setMedalsAndRibbons() {
        if($scope.topRatedShows.length) {
            for(var placeIndex = 0; placeIndex < medals.length; placeIndex++){
                if($scope.topRatedShows[placeIndex]) {
                    $scope.topRatedShows[placeIndex].medal = medals[placeIndex].medalImageURL;
                    $scope.topRatedShows[placeIndex].ribbon = medals[placeIndex].ribbonImageURL;
                }
            }
        }
    }

    function startCarousel() {
        carousel = $interval(function() {
            changeShow(getIndex());
        }, 4000);
    }

    $scope.startCarousel = startCarousel;
    $scope.pauseCarousel = function() {
        $interval.cancel(carousel);
    };

    var changeShow = function(number) {
        currentShowIndex = number + 1;
        $scope.showOnFocus = $scope.topRatedShows[number];
    };

    function getIndex() {
        if (currentShowIndex > 2) {
            currentShowIndex = 0;
        }
        return currentShowIndex++;
    }

    AllShowsService.getTopShows().then(function(res) {
        $scope.topRatedShows = res.data.slice(0, 10);
        setMedalsAndRibbons();

        $scope.topRatedShows.forEach(function(show) {
            show.stars = AllShowsService.createStars(show.imdbRating);
        });

        $scope.showOnFocus = $scope.topRatedShows[0];
        $scope.changeShow = changeShow;

        startCarousel();
    });
}]);