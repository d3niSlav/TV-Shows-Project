angular.module('SingleShowCtrl', []).controller('SingleShowController', ['$scope', '$routeParams', 'SingleShow', function($scope, $routeParams, SingleShow) {
    $scope.showEpisodesClass = "";
    $scope.hideEpisodesClass = "hide";

    SingleShow.getShowData($routeParams.showId)
        .then(function(res) {
            $scope.show = res.data;
            $scope.currentSeason = res.data.seasons[res.data.seasons.length - 1];
        });

    $scope.changeSeason = function(index) {
        $scope.currentSeason = $scope.show.seasons[index];
        $scope.showEpisodesClass = "";
        $scope.hideEpisodesClass = "hide";
    }

    $scope.showEpisodes = function() {
        $scope.showEpisodesClass = "hide";
        $scope.hideEpisodesClass = "";
    }

    $scope.hideEpisodes = function() {
        $scope.showEpisodesClass = "";
        $scope.hideEpisodesClass = "hide";
    }
}]);