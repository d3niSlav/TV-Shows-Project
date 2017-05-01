angular.module('AllShowsCtrl', []).controller('AllShowsController', ['$scope', 'AllShows', function($scope, AllShows) {
    $scope.orderCriteria = 'title';

    AllShows.getAllShows().then(function(res) {
        var shows = res.data

        $scope.shows = shows;
        $scope.categories = AllShows.getCategories(shows);
        $scope.categoriesArray = JSON.parse(AllShows.createFiterJSON($scope.categories));

        $scope.categoryFilter = function(a) {
            var selectedCategories = [];

            for (var index = 0; index < $scope.categoriesArray.length; index++) {
                var currCategory = $scope.categoriesArray[index];
                if (currCategory.on) {
                    selectedCategories.push(currCategory.name);
                }
            }

            if (selectedCategories.length) {
                for (category in $scope.categoriesArray) {
                    var genre = $scope.categoriesArray[category];
                    if (genre.on) {
                        if (a.genre.indexOf(genre.name) < 0) {
                            return false;
                        }
                    }
                }
                return true;
            } else {
                return true;
            }
        };
    });

    function switchCategories() {
        if ($('.open-categories').hasClass('open')) {
            closeCategories();
        } else {
            openCategories();
        }
        $('.open-categories').toggleClass('open');
    }
    $scope.switchCategories = switchCategories;

    function closeCategories() {
        $('.open-categories').toggleClass('hide');
        $('.close-categories').toggleClass('hide');
        $('.categories-list').fadeOut();
    }

    function openCategories() {
        $('.open-categories').toggleClass('hide');
        $('.close-categories').toggleClass('hide');
        $('.categories-list').fadeIn("slow");
    }

    function orderByTitleAsc() {
        $('.order-by-title-asc').addClass('active');
        $('.order-by-title-asc').siblings().removeClass('active');
        $scope.orderCriteria = 'title';
    }
    $scope.orderByTitleAsc = orderByTitleAsc;

    function orderByTitleDesc() {
        $('.order-by-title-desc').addClass('active');
        $('.order-by-title-desc').siblings().removeClass('active');
        $scope.orderCriteria = '-title';
    }
    $scope.orderByTitleDesc = orderByTitleDesc;

    function orderByRating() {
        $('.order-by-rating').addClass('active');
        $('.order-by-rating').siblings().removeClass('active');
        $scope.orderCriteria = '-imdbRating';
    }
    $scope.orderByRating = orderByRating;

    function orderByDate() {
        $('.order-by-date').addClass('active');
        $('.order-by-date').siblings().removeClass('active');
        $scope.orderCriteria = '-releasedDate';
    }
    $scope.orderByDate = orderByDate;
}]);