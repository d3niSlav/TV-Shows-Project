angular.module('ProfilesCtrl', []).controller('ProfilesController', ['$scope', '$location', 'Profiles', 'Main', 'SingleShow', function($scope, $location, Profiles, Main, SingleShow) {
    Main.getLoggedUserId().then(function(res) {
        var userId = JSON.parse(res.data).userId;

        if (userId) {
            Profiles.getUserProfile(userId).then(function(res) {
                $scope.user = res.data;
                $scope.user.date = new Date(res.data.dateCreated).toUTCString().slice(4, 16);

                var watchedShows = [];
                for (var index = 0; index < res.data.watchList.length; index++) {
                    SingleShow.getShowData(res.data.watchList[index]).then(function(res) {
                        watchedShows.push(res.data);
                    });
                }
                $scope.user.watchedShows = watchedShows;

                var favoriteShows = [];
                for (var index = 0; index < res.data.favorites.length; index++) {
                    SingleShow.getShowData(res.data.favorites[index]).then(function(res) {
                        favoriteShows.push(res.data);
                    });
                }
                $scope.user.favoriteShows = favoriteShows;
            });
        } else {
            $location.path('/login');
        }
    });



    $scope.editProfile = function() {
        $('#userWatchedList').fadeOut();
        $('#userFavoriteList').fadeOut();
        $('#editProfileSection').fadeIn("slow");
    }

    $scope.cancelEditProfile = function() {
        $('#editProfileSection').fadeOut();
        $('#userWatchedList').fadeIn("slow");
        $('#userFavoriteList').fadeIn("slow");

    }
}]);