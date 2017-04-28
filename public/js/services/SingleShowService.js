angular.module('SingleShowService', []).factory('SingleShow', ['$http', 'Profiles', function($http, Profiles) {
    return {
        getShowData: function(showId) {
            return $http.get('/api/show/' + showId);
        },

        checkShowForTheUser: function(userId, showId) {
            Profiles.getUserProfile(userId).then(function(res) {
                if (res.data.watchList.includes(showId)) {
                    $('#watchlistBtn').addClass('watched');
                }
                if (res.data.favorites.includes(showId)) {
                    $('#favoritesBtn').addClass('watched');
                }
            });
        },

        clearUserData: function() {
            $('#watchlistBtn').removeClass('watched');
            $('#favoritesBtn').removeClass('watched');
        },

        favoritesAction: function(userId, showId) {
            Profiles.getUserProfile(userId).then(function(res) {
                var data = JSON.stringify({ "userId": userId, "showId": showId });

                if (res.data.favorites.includes(showId)) {
                    $http.put('/api/profile/removeFromFavorites', data);
                } else {
                    $http.put('/api/profile/addToFavorites', data);
                }
            });
        },

        watchlistAction: function(userId, showId) {
            Profiles.getUserProfile(userId).then(function(res) {
                var data = JSON.stringify({ "userId": userId, "showId": showId });

                if (res.data.watchList.includes(showId)) {
                    $http.put('/api/profile/removeFromWatchlist', data);
                } else {
                    $http.put('/api/profile/addToWatchlist', data);
                }
            });
        }
    }
}]);