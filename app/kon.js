    var curr = new Date();
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

    function WeeklyEpisode(id, title, logo, seasonNo, episodeNo, date) {
        this.id = id;
        this.title = title;
        this.logo = logo;
        this.seasonNo = seasonNo;
        this.episodeNo = episodeNo;
        this.date = new Date(date);
    }

    var thisWeekEpisodes = [];

    function getEpisode(shows) {
        var curr = new Date();

        var sundayDate = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        var mondayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
        var tuesdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 2));
        var wednesdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 3));
        var thursdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 4));
        var fridayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 5));
        var saturdayDate = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

        console.log(sundayDate);
        console.log(mondayDate);
        console.log(tuesdayDate);
        console.log(wednesdayDate);
        console.log(thursdayDate);
        console.log(fridayDate);
        console.log(saturdayDate);

        for (var showIndex = 0; showIndex < shows.length; showIndex++) {
            var currentShow = shows[showIndex];
            if (currentShow.seasons) {

                for (var seasonNo = 0; seasonNo < currentShow.seasons.length; seasonNo++) {
                    var currentSeason = currentShow.seasons[seasonNo];

                    if (currentSeason.episodes) {
                        for (var episodeNo = 0; episodeNo < currentSeason.episodes.length; episodeNo++) {
                            var episode = currentSeason.episodes[episodeNo];
                            var airDate = new Date(episode.episodeDate);
                            if (airDate.getTime() >= mondayDate.getTime() && airDate.getTime() <= sundayDate.getTime()) {
                                switch (airDate.getTime()) {
                                    case mondayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case tuesdayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case wednesDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case thursdayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case fridayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case saturdayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                    case sundayDate.getTime():
                                        console.log(currentShow.title);
                                        break;
                                }
                                thisWeekEpisodes.push(new WeeklyEpisode(currentShow._id, currentShow.title, currentShow.logo, seasonNo + 1, episodeNo + 1, episode.episodeDate));
                            }
                        }
                    }
                }
            }
        }
    }