angular.module('SingleShowCtrl', []).controller('SingleShowController', ['$scope', '$sce', '$routeParams', 'SingleShow', function($scope, $sce, $routeParams, SingleShow) {

    $('#show-comments').hide();
    $('#show-trailer').hide();

    SingleShow.getShowData($routeParams.showId)
        .then(function(res) {
            $scope.show = res.data;
            $scope.currentSeason = res.data.seasons[res.data.seasons.length - 1];
            $scope.trailerVideo = $sce.trustAsHtml('<iframe width="560" height="349" src=" ' + res.data.trailer + '" frameborder="0" allowfullscreen></iframe>');
        });

    $scope.showEpisodesClass = "";
    $scope.hideEpisodesClass = "hide";

    $scope.changeSeason = function(index) {
        $scope.currentSeason = $scope.show.seasons[index];
        $scope.showEpisodesClass = "";
        $scope.hideEpisodesClass = "hide";
    }

    $scope.showEpisodes = function() {
        $scope.showEpisodesClass = "hide";
        $scope.hideEpisodesClass = "";

        $('html,body').animate({ scrollTop: $("#show-episodes").offset().top }, 'slow');
    }

    $scope.hideEpisodes = function() {
        $scope.showEpisodesClass = "";
        $scope.hideEpisodesClass = "hide";
    }

    $scope.navigateToSeasons = function() {
        $('#show-seasons').show();
        $('#show-seasons').siblings().hide();
        $('#goToSeasonsInfo').addClass('active');
        $('#goToComments').removeClass('active');
        $('#goToTrailer').removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-seasons").offset().top }, 'slow');
    }

    $scope.navigateToComments = function() {
        $('#show-comments').show();
        $('#show-comments').siblings().hide();
        $('#goToComments').addClass('active');
        $('#goToSeasonsInfo').removeClass('active');
        $('#goToTrailer').removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-comments").offset().top }, 'slow');
    }

    $scope.navigateToTrailer = function() {
        $('#show-trailer').show();
        $('#show-trailer').siblings().hide();
        $('#goToTrailer').addClass('active');
        $('#goToComments').removeClass('active');
        $('#goToSeasonsInfo').removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-trailer").offset().top }, 'slow');
    }

    $scope.addToFavorites = function() {
        $('#favoritesBtn').toggleClass('active');
    }

    $scope.addToWatchlist = function() {
        $('#watchlistBtn').toggleClass('active');
    }
}]);