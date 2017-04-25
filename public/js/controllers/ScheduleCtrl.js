angular.module('ScheduleCtrl', []).controller('ScheduleController', ['$scope', 'AllShows', function($scope, AllShows) {
    AllShows.getAllShows().then(function(res) {
        var shows = res.data;
        getEpisode(shows);
    });

    function WeeklyEpisode(id, title, logo, seasonNo, episodeNo, date) {
        this.id = id;
        this.title = title;
        this.logo = logo;
        this.seasonNo = seasonNo;
        this.episodeNo = episodeNo;
        this.date = new Date(date);
    }

    function getEpisode(shows) {
        var curr = new Date();

        var sundayDate = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        var mondayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
        var tuesdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 2));
        var wednesdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 3));
        var thursdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 4));
        var fridayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 5));
        var saturdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

        var sundayShows = [];
        var mondayShows = [];
        var tuesdayShows = [];
        var wednesdayShows = [];
        var thursdayShows = [];
        var fridayShows = [];
        var saturdayShows = [];

        for (var showIndex = 0; showIndex < shows.length; showIndex++) {
            var currentShow = shows[showIndex];
            if (currentShow.seasons) {

                for (var seasonNo = 0; seasonNo < currentShow.seasons.length; seasonNo++) {
                    var currentSeason = currentShow.seasons[seasonNo];

                    if (currentSeason.episodes) {
                        for (var episodeNo = 0; episodeNo < currentSeason.episodes.length; episodeNo++) {
                            var episode = currentSeason.episodes[episodeNo];
                            var airDate = new Date(episode.episodeDate);
                            if (airDate.getTime() >= sundayDate.getTime() && airDate.getTime() <= saturdayDate.getTime()) {
                                switch (airDate.getDay()) {
                                    case (mondayDate.getDay()):
                                        console.log(currentShow.title);
                                        mondayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (tuesdayDate.getDay()):
                                        console.log(currentShow.title);
                                        tuesdayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (wednesdayDate.getDay()):
                                        console.log(currentShow.title);
                                        wednesdayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (thursdayDate.getDay()):
                                        console.log(currentShow.title);
                                        thursdayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (fridayDate.getDay()):
                                        console.log(currentShow.title);
                                        fridayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (saturdayDate.getDay()):
                                        console.log(currentShow.title);
                                        saturdayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                    case (sundayDate.getDay()):
                                        console.log(currentShow.title);
                                        sundayShows.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.sundayShows = sundayShows;
        $scope.sundayDate = sundayDate.toUTCString().slice(5, 16);
        $scope.mondayShows = mondayShows;
        $scope.mondayDate = mondayDate.toUTCString().slice(5, 16);
        $scope.tuesdayShows = tuesdayShows;
        $scope.tuesdayDate = tuesdayDate.toUTCString().slice(5, 16);
        $scope.wednesdayShows = wednesdayShows;
        $scope.wednesdayDate = wednesdayDate.toUTCString().slice(5, 16);
        $scope.thursdayShows = thursdayShows;
        $scope.thursdayDate = thursdayDate.toUTCString().slice(5, 16);
        $scope.fridayShows = fridayShows;
        $scope.fridayDate = fridayDate.toUTCString().slice(5, 16);
        $scope.saturdayShows = saturdayShows;
        $scope.saturdayDate = saturdayDate.toUTCString().slice(5, 16);
    }
}]);