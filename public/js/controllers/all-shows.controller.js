angular.module('AllShowsController', []).controller('AllShowsController', ['$scope', 'AllShowsService', function($scope, AllShowsService) {
    $scope.isCategoriesMenuOpen = false;
    $scope.orderCriteria = {
        titleAscending: {
            name: 'titleAscending',
            criteria: 'title',
            isActive: true
        },
        titleDescending: {
            name: 'titleDescending',
            criteria: '-title',
            isActive: false
        },
        rating: {
            name: 'rating',
            criteria: '-imdbRating',
            isActive: false
        },
        releaseDate:{
            name: 'releaseDate',
            criteria: '-releasedDate',
            isActive: false
        }
    };
    $scope.currentOrderCriteria = $scope.orderCriteria.titleAscending.criteria;

    AllShowsService.getAllShowsBasicInformation().then(function(res) {
        var shows = res.data;

        $scope.shows = shows;
        $scope.categories = AllShowsService.createCategoriesArray(shows);
        $scope.categoriesArray = AllShowsService.createFilterCriteria($scope.categories);

        $scope.filterCategories = function(show) {
            if (Object.keys($scope.categoriesArray).length) {
                for (var category in $scope.categoriesArray) {
                    var genre = $scope.categoriesArray[category];
                    if (genre.on && show.genre.indexOf(genre.name) < 0) {
                        return false;
                    }
                }
            }
            return true;
        };
    });

    $scope.switchCategories = function () {
        $scope.isCategoriesMenuOpen = !$scope.isCategoriesMenuOpen;
    };

    $scope.orderByTitleAsc = function () {
        changeOrderCriteria($scope.orderCriteria.titleAscending.name);
        $scope.currentOrderCriteria = $scope.orderCriteria.titleAscending.criteria;
    };

    $scope.orderByTitleDesc = function () {
        changeOrderCriteria($scope.orderCriteria.titleDescending.name);
        $scope.currentOrderCriteria = $scope.orderCriteria.titleDescending.criteria;
    };

    $scope.orderByRating = function () {
        changeOrderCriteria($scope.orderCriteria.rating.name);
        $scope.currentOrderCriteria = $scope.orderCriteria.rating.criteria;
    };

    $scope.orderByDate = function () {
        changeOrderCriteria($scope.orderCriteria.releaseDate.name);
        $scope.currentOrderCriteria = $scope.orderCriteria.releaseDate.criteria;
    };

    function changeOrderCriteria(newCriteria){
        for(var criteria in $scope.orderCriteria){
            $scope.orderCriteria[criteria].isActive = (criteria === newCriteria);
        }
    }
}]);