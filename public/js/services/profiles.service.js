angular.module('ProfilesService', []).factory('ProfilesService', ['$http', function ($http) {
    return {
        getUserProfile: function (userId) {
            return $http.get('/api/profile/' + userId);
        },

        getLocation: function () {
            return $http.get('http://freegeoip.net/json/');
        },

        updateName: function (newName, userId) {
            return $http.put('/api/profile/change/name', { userId: userId, name: newName });
        },

        updateEmail: function (newEmail, userId) {
            return $http.put('/api/profile/change/email', { userId: userId, email: newEmail });
        },

        updatePassword: function (newPassword, passwordConfirm, oldPassword, userId) {
            return $http.put('/api/profile/change/password', { userId: userId, newPassword: newPassword, passwordConfirm: passwordConfirm, oldPassword: oldPassword });
        },

        updateShowProgress: function (userId, showId, newSeason, newEpisode) {
            var data = {
                userId: userId,
                showId: showId,
                newSeason: newSeason,
                newEpisode: newEpisode
            };
            return $http.put('/api/profile/updateShowProgress', data);
        },

        uploadImage: function (file, userId) {
            var customFormData = new FormData();
            customFormData.append('file', file);
            customFormData.append('userId', userId);
            return $http.post('/api/upload', customFormData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }
}]);