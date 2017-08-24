angular.module('SearchController', []).controller('SearchController', ['$scope', 'AllShowsService', function($scope, AllShowsService) {
    AllShowsService.getAllShowsBasicInformation().then(function(res) {
        $scope.allShows = res.data;
    });

    $scope.searchOptions = [
        {criteria: 'title' , name: 'Title'},
        {criteria: 'year' , name: 'Year'},
        {criteria: 'genre' , name: 'Genre'},
        {criteria: 'plot' , name: 'Plot'},
        {criteria: '$' , name: 'Filter all'}
    ];
    $scope.selectedOption = $scope.searchOptions[$scope.searchOptions.length - 1];
    $scope.query = {};
    $scope.queryBy = '$';
    $scope.changeCriteria = function () {
        $scope.queryBy = $scope.selectedOption.criteria;
    };
}]);