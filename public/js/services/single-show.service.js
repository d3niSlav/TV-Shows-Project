angular.module('SingleShowService', []).factory('SingleShowService', ['$http', 'ProfilesService', function($http, ProfilesService) {
    return {
        getShowData: function(showId) {
            return $http.get('/api/show/' + showId);
        },

        favoritesAction: function(userId, showId) {
            ProfilesService.getUserProfile(userId).then(function(res) {
                var data = {
                    'userId': userId,
                    'showId': showId
                };

                if (res.data.favorites.indexOf(showId) >= 0) {
                    $http.put('/api/profile/removeFromFavorites', data);
                } else {
                    $http.put('/api/profile/addToFavorites', data);
                }
            });
        },

        watchlistAction: function(userId, showId) {
            ProfilesService.getUserProfile(userId).then(function(res) {
                var data = {
                    'userId': userId,
                    'showId': showId
                };

                var show = res.data.watchList.find(function (show) { return show.showId === showId; });
                if (show) {
                    $http.put('/api/profile/removeFromWatchlist', data);
                } else {
                    $http.put('/api/profile/addToWatchlist', data);
                }
            });
        },

        getShowSeasonsAndEpisodesCount: function (showId) {
            return $http.get('/api/shows/options/' + showId);
        }
    }
}]);