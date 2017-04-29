angular.module('SingleShowCtrl', []).controller('SingleShowController', ['$scope', '$location', '$sce', '$routeParams', 'SingleShow', 'Main', 'Comments', 'Profiles', function($scope, $location, $sce, $routeParams, SingleShow, Main, Comments, Profiles) {

    $('#show-comments').hide();
    $('#show-trailer').hide();

    SingleShow.getShowData($routeParams.showId).then(function(res) {
        $scope.show = res.data;
        $scope.currentSeason = res.data.seasons[res.data.seasons.length - 1];
        $scope.trailerVideo = $sce.trustAsHtml('<iframe width="560" height="349" src=" ' + res.data.trailer + '" frameborder="0" allowfullscreen></iframe>');

        Main.getLoggedUserId().then(function(res) {
            if (JSON.parse(res.data).userId) {
                SingleShow.checkShowForTheUser(JSON.parse(res.data).userId, $routeParams.showId);
            } else {
                SingleShow.clearUserData();
            }
        });
    });

    Comments.getComments().then(function(res) {
        var comments = res.data;

        function assignUserToComment(index, userId) {
            Profiles.getUserProfile(userId).then(function(res) {
                $scope.allComments[index].user = res.data;
            });
        }

        for (var index = 0; index < comments.length; index++) {
            comments[index].datePosted = new Date(comments[index].date).toUTCString().slice(4, 22);
            assignUserToComment(index, comments[index].userId);
        }

        $scope.allComments = comments;
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
        $('#goToSeasonsInfo').siblings().removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-seasons").offset().top }, 'slow');
    }

    $scope.navigateToComments = function() {
        $('#show-comments').show();
        $('#show-comments').siblings().hide();
        $('#goToComments').addClass('active');
        $('#goToComments').siblings().removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-comments").offset().top }, 'slow');
    }

    $scope.navigateToTrailer = function() {
        $('#show-trailer').show();
        $('#show-trailer').siblings().hide();
        $('#goToTrailer').addClass('active');
        $('#goToTrailer').siblings().removeClass('active');
        $('html,body').animate({ scrollTop: $("#show-trailer").offset().top }, 'slow');
    }

    $scope.addToFavorites = function() {
        Main.getLoggedUserId().then(function(res) {
            if (JSON.parse(res.data).userId) {
                SingleShow.favoritesAction(JSON.parse(res.data).userId, $routeParams.showId)
                $('#favoritesBtn').toggleClass('favorite');
            } else {
                $location.path('/login');
            }
        });
    }

    $scope.addToWatchlist = function() {
        Main.getLoggedUserId().then(function(res) {
            if (JSON.parse(res.data).userId) {
                SingleShow.watchlistAction(JSON.parse(res.data).userId, $routeParams.showId)
                $('#watchlistBtn').toggleClass('watched');
            } else {
                $location.path('/login');
            }
        });
    }
}]);