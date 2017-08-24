angular.module('ScheduleController', []).controller('ScheduleController', ['$scope', 'AllShowsService', 'MainService', function($scope, AllShowsService, MainService) {
    const WEEK_DAYS_NUMBER = 7;
    const BEGINNING_DAY_INDEX = 0;
    const END_DAY_INDEX = 6;

    var startOfWeek = MainService.getDateByWeekDay(BEGINNING_DAY_INDEX);
    var endOfWeek = MainService.getDateByWeekDay(END_DAY_INDEX);

    AllShowsService.getAllShowsForPeriodOfTime(startOfWeek.toISOString(), endOfWeek.toISOString()).then(function(res) {
        var shows = res.data;
        sortShowsByDays(shows);
    });

    function sortShowsByDays(shows) {
        var schedule = [];
        var weekDaysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (var dayIndex = 0; dayIndex < WEEK_DAYS_NUMBER; dayIndex++) {
            schedule[dayIndex] = {
                dayName: weekDaysNames[dayIndex],
                dateString: MainService.formatDateWithTimeString(MainService.getDateByWeekDay(dayIndex)),
                episodes: []
            };
        }

        var startOfWeekTime = startOfWeek.getTime();
        var endOfWeekTime = endOfWeek.getTime();

        for (var showIndex = 0; showIndex < shows.length; showIndex++) {
            var currentShow = shows[showIndex];
            var airDate = new Date(currentShow.date);
            if (airDate.getTime() >= startOfWeekTime && airDate.getTime() <= endOfWeekTime) {
                schedule[airDate.getDay()].episodes.push(currentShow);
            }
        }

        $scope.weekSchedule = schedule;
    }
}]);