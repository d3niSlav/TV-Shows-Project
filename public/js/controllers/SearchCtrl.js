angular.module('SearchCtrl', []).controller('SearchController', ['$scope', 'AllShows', function($scope, AllShows) {
    $(document).ready(function(e) {
        $('.search-panel .dropdown-menu').find('a').click(function(e) {
            e.preventDefault();
            var param = $(this).attr("href").replace("#", "");
            var concept = $(this).text();
            $('.search-panel span#search_concept').text(concept);
            $scope.queryBy = param;
        });
    });

    $scope.query = {};
    $scope.queryBy = '$';

    AllShows.getAllShows().then(function(res) {
        $scope.allShows = res.data;
    });
}]);