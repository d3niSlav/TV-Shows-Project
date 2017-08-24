angular.module('MainService', []).factory('MainService', ['$http', '$q', function($http, $q) {
    var currentUserId = '';

    return {
        getLoggedUserId: function() {
            var promise;
            if (currentUserId) {
                promise = $q.when(currentUserId);
            } else {
                promise = $http.get('/api/logged').then(function(res) {
                    var userId = '';
                    try {
                        userId = JSON.parse(res.data).userId;
                    } catch (e) {
                        userId = '';
                    }
                    currentUserId = userId;
                    return userId;
                });
            }
            return promise;
        },

        logoutUser: function() {
            currentUserId = '';
            return $http.get('/logout');
        },

        formatDateString: function(date) {
            return new Date(date).toUTCString().slice(5, 22);
        },

        formatDateWithTimeString: function(date) {
            return date.toUTCString().slice(5, 16);
        },

        getDateByWeekDay: function(dayIndex) {
            var currentDate = new Date();
            var newDay = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + dayIndex));
            newDay.setHours(3, 0, 0, 0);
            return newDay;
        }
    }
}]);