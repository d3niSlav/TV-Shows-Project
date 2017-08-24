angular.module('ProfilesController', []).controller('ProfilesController', ['$scope', '$location', '$timeout', 'ProfilesService', 'MainService', 'SingleShowService', 'AllShowsService', function ($scope, $location, $timeout, ProfilesService, MainService, SingleShowService, AllShowsService) {
    $scope.isEditProfileOpen = false;
    $scope.isProgressTrackerOpen = false;
    $scope.currentLocation = 'Unknown';
    $scope.profileImage = {};
    $scope.isImageEditFired = false;
    $scope.isImageUploadedSuccessfully = true;

    $scope.imageUploadClass = '';

    $scope.toggleEditProfile = function () {
        $scope.isEditProfileOpen = !$scope.isEditProfileOpen;
        $scope.isProgressTrackerOpen = false;
    };
    $scope.toggleShowsProgress = function () {
        $scope.isProgressTrackerOpen = !$scope.isProgressTrackerOpen;
        $scope.isEditProfileOpen = false;
    };
    $scope.messages = {};
    $scope.formData = {
        name: '',
        email: ''
    };

    const SUCCESS_MESSAGE_DISPLAY_TIME = 5000;
    const PROFILE_UPLOADS_PATH = '../images/uploads/';

    function initializeMessageFields() {
        $scope.messages = {
            name: {
                text: '',
                isError: false
            },

            email: {
                text: '',
                isError: false
            },

            password: {
                text: '',
                isError: false
            },

            passwordConfirm: {
                text: '',
                isError: false
            },

            passwordOld: {
                text: '',
                isError: false
            }
        };
    }

    initializeMessageFields();

    ProfilesService.getLocation().then(function (response) {
        $scope.currentLocation = response.data.city + ', ' + response.data.country_name;
    });

    function getShowsIdsFromWatchedList(watchedList) {
        return watchedList.map(function (show) {
            return show.showId;
        })
    }

    function loadShowsProgress(showsIds, currentWatchlist) {
        var currentWatchlistShowsIds = getWatchedShowDataById(currentWatchlist);
        AllShowsService.getShowsProgressByIds(showsIds).then(function (res) {
            var myWatchedShowsProgress = res.data;

            for (var index = 0; index < myWatchedShowsProgress.length; index++) {
                myWatchedShowsProgress[index].currentSeason = currentWatchlistShowsIds[myWatchedShowsProgress[index]._id].currentSeason;
                myWatchedShowsProgress[index].currentEpisode = currentWatchlistShowsIds[myWatchedShowsProgress[index]._id].currentEpisode;
                delete myWatchedShowsProgress[index]['seasons'];
            }

            $scope.myWatchedShowsProgress = myWatchedShowsProgress;
        });
    }

    function getWatchedShowDataById(allWatchedShows) {
        var mappedWatchlist = {};
        allWatchedShows.forEach(function (show) {
            mappedWatchlist[show.showId] = show;
        });
        return mappedWatchlist;
    }

    function saveShowNewProgress(show) {
        ProfilesService.updateShowProgress(
            $scope.user.userId,
            show._id,
            show.currentSeason,
            show.currentEpisode
        );
    }

    function loadOptionsForShow(showIndex) {
        return new Promise(function (resolve, reject) {
            var watchedShowProgress = $scope.myWatchedShowsProgress[showIndex];

            SingleShowService.getShowSeasonsAndEpisodesCount(watchedShowProgress._id).then(function (res) {
                var seasons = {};
                var showData = res.data[0].seasons;

                for (var index = 0; index < showData.length; index++) {
                    var seasonData = showData[index];
                    seasons[seasonData.number] = seasonData.numberOfEpisodes;
                }

                watchedShowProgress.totalSeasons = showData.length;
                watchedShowProgress.selectedSeason = watchedShowProgress.currentSeason;
                watchedShowProgress.totalEpisodes = seasons[watchedShowProgress.selectedSeason];
                watchedShowProgress.selectedEpisode = watchedShowProgress.currentEpisode;
                watchedShowProgress.allSeasons = seasons;

                $scope.myWatchedShowsProgress[showIndex] = watchedShowProgress;
                resolve(true);
            });
        });
    }

    MainService.getLoggedUserId().then(function (userId) {
        if (userId) {
            ProfilesService.getUserProfile(userId).then(function (res) {
                $scope.user = res.data;
                $scope.formData.name = res.data.name;
                $scope.formData.email = res.data.email;
                $scope.user.date = MainService.formatDateWithTimeString(new Date(res.data.dateCreated));

                var watchedListShowsIds = getShowsIdsFromWatchedList(res.data.watchList);
                AllShowsService.getShowsBasicInformationByIds(watchedListShowsIds).then(function (res) {
                    $scope.user.watchedShows = res.data;
                });

                AllShowsService.getShowsBasicInformationByIds(res.data.favorites).then(function (res) {
                    $scope.user.favoriteShows = res.data;
                });
                loadShowsProgress(watchedListShowsIds, res.data.watchList);
            });
        } else {
            $location.path('/login');
        }
    });

    $scope.$watch('profileImage.file', function () {
        if ($scope.profileImage.file) {
            ProfilesService.uploadImage($scope.profileImage.file, $scope.user._id).then(function (res) {
                $scope.user.profileImg = PROFILE_UPLOADS_PATH + res.data.filename + '?' + new Date().getTime();
                $scope.isImageEditFired = true;
                $scope.isImageUploadedSuccessfully = true;
                clearProfilePictureGlowEffects();
            }).catch(function (e) {
                $scope.isImageEditFired = true;
                $scope.isImageUploadedSuccessfully = false;
                clearProfilePictureGlowEffects();
            });
        }

        function clearProfilePictureGlowEffects() {
            $timeout(function () {
                $scope.isImageEditFired = false;
            }, SUCCESS_MESSAGE_DISPLAY_TIME);
        }
    });

    $scope.changeName = function () {
        ProfilesService.updateName($scope.formData.name, $scope.user.userId).then(function (res) {
            $scope.user.name = res.data.name;
            $scope.messages.name.text = res.data.message;
            $scope.messages.name.isError = false;
            $timeout(initializeMessageFields, SUCCESS_MESSAGE_DISPLAY_TIME);
        }).catch(function (e) {
            $scope.messages.name.text = e.data.error.name[0];
            $scope.messages.name.isError = true;
        });
    };

    $scope.changeEmail = function () {
        ProfilesService.updateEmail($scope.formData.email, $scope.user.userId).then(function (res) {
            $scope.user.email = res.data.email;
            $scope.messages.email.text = res.data.message;
            $scope.messages.email.isError = false;
            $timeout(initializeMessageFields, SUCCESS_MESSAGE_DISPLAY_TIME);
        }).catch(function (e) {
            $scope.messages.email.text = e.data.error.email[0];
            $scope.messages.email.isError = true;
        });
    };

    $scope.changePassword = function () {
        initializeMessageFields();

        ProfilesService.updatePassword($scope.formData.password, $scope.formData.passwordConfirm, $scope.formData.passwordOld, $scope.user.userId).then(function (res) {
            $scope.messages.password.text = res.data.message;
            $scope.clearPasswordFields();
            $timeout(initializeMessageFields, SUCCESS_MESSAGE_DISPLAY_TIME);
        }).catch(function (e) {
            if (e.data.error.newPassword.length > 0) {
                $scope.messages.password.text = e.data.error.newPassword[0];
                $scope.messages.password.isError = true;
            }

            if (e.data.error.passwordConfirm.length > 0) {
                $scope.messages.passwordConfirm.text = e.data.error.passwordConfirm[0];
                $scope.messages.passwordConfirm.isError = true;
            }

            if (e.data.error.oldPassword.length > 0) {
                $scope.messages.passwordOld.text = e.data.error.oldPassword[0];
                $scope.messages.passwordOld.isError = true;
            }
        });
    };

    $scope.resetName = function () {
        $scope.formData.name = $scope.user.name;
        $scope.messages.name.text = '';
    };

    $scope.resetEmail = function () {
        $scope.formData.email = $scope.user.email;
        $scope.messages.email.text = '';
    };

    $scope.clearPasswordFields = function () {
        $scope.formData.password = '';
        $scope.formData.passwordConfirm = '';
        $scope.formData.passwordOld = '';
    };

    $scope.openEditProgress = function (showIndex, showId) {
        $scope.myWatchedShowsProgress[showIndex].isEditActive = true;
        loadOptionsForShow(showIndex);
    };

    $scope.generateNumbersFromTo = function (start, end) {
        var result = [];
        for (var i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    };

    $scope.changeNumberOfEpisodes = function (seasonNumber, showIndex) {
        $scope.myWatchedShowsProgress[showIndex].selectedEpisode = 1;
        $scope.myWatchedShowsProgress[showIndex].totalEpisodes = $scope.myWatchedShowsProgress[showIndex].allSeasons[seasonNumber];
    };

    $scope.hideChangeProgressOption = function (showIndex) {
        $scope.myWatchedShowsProgress[showIndex].isEditActive = false;
    };

    $scope.resetProgressBackToCurrent = function (showIndex) {
        $scope.myWatchedShowsProgress[showIndex].selectedSeason = $scope.myWatchedShowsProgress[showIndex].currentSeason;
        $scope.myWatchedShowsProgress[showIndex].selectedEpisode = $scope.myWatchedShowsProgress[showIndex].currentEpisode;
    };

    $scope.changeCurrentProgress = function (showIndex) {
        $scope.myWatchedShowsProgress[showIndex].currentSeason = $scope.myWatchedShowsProgress[showIndex].selectedSeason;
        $scope.myWatchedShowsProgress[showIndex].currentEpisode = $scope.myWatchedShowsProgress[showIndex].selectedEpisode;
        $scope.myWatchedShowsProgress[showIndex].isEditActive = false;
        saveShowNewProgress($scope.myWatchedShowsProgress[showIndex]);
    };

    $scope.moveCurrentProgressToNextEpisode = function (showIndex) {
        loadOptionsForShow(showIndex).then(function () {
            var currentEpisodesMax = $scope.myWatchedShowsProgress[showIndex].allSeasons[$scope.myWatchedShowsProgress[showIndex].currentSeason];

            if ($scope.myWatchedShowsProgress[showIndex].currentEpisode === currentEpisodesMax) {
                if ($scope.myWatchedShowsProgress[showIndex].currentSeason !== parseInt($scope.myWatchedShowsProgress[showIndex].latestSeason)) {
                    $scope.myWatchedShowsProgress[showIndex].currentSeason += 1;
                    $scope.myWatchedShowsProgress[showIndex].currentEpisode = 1;
                }
            } else {
                $scope.myWatchedShowsProgress[showIndex].currentEpisode += 1;
            }

            saveShowNewProgress($scope.myWatchedShowsProgress[showIndex]);
        });
    };
}]);