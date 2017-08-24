angular.module('SingleShowController', []).controller('SingleShowController', ['$rootScope', '$scope', '$location', '$sce', '$routeParams', 'SingleShowService', 'MainService', 'CommentsService', 'ProfilesService', function ($rootScope, $scope, $location, $sce, $routeParams, SingleShowService, MainService, CommentsService, ProfilesService) {
    const LIKE_ADDED_CONFIRM = 'likeAdded';
    const LIKE_REMOVED_CONFIRM = 'likeRemoved';
    const TV_SHOW_PAGE_PATH = 'show';

    var currentUserId;

    $scope.areCommentsOpen = false;
    $scope.areSeasonsOpen = true;
    $scope.isTrailerOpen = false;
    $scope.isCurrentCommentLiked = {};
    $scope.commentMessage = {};

    var clearUserData = function () {
        $scope.isShowFavorite = false;
        $scope.isShowWatched = false;
    };
    clearUserData();

    MainService.getLoggedUserId().then(function (userId) {
        currentUserId = userId;
        fillCollectionsButtons();
        loadCommentsForTheShow();
    });

    function fillCollectionsButtons() {
        if (currentUserId) {
            ProfilesService.getUserProfile(currentUserId).then(function (res) {
                if (res.data.favorites.indexOf($routeParams.showId) >= 0) {
                    $scope.isShowFavorite = true;
                }

                var show = res.data.watchList.find(function (show) { return show.showId === $routeParams.showId; });
                if (show) {
                    $scope.isShowWatched = true;
                }
            });
        } else {
            clearUserData();
        }
    }

    function loadCommentsForTheShow() {
        CommentsService.getComments($routeParams.showId).then(function (res) {
            var comments = res.data;

            for (var index = 0; index < comments.length; index++) {
                comments[index].datePosted = MainService.formatDateString(comments[index].date);
                assignUserToComment(index, comments[index].userId);
                loadLikeButton(comments[index]);
            }

            $scope.allComments = comments;
        });
    }

    function refreshAllCommentsLikes() {
        var comments = $scope.allComments;
        if (comments) {
            for (var index = 0; index < comments.length; index++) {
                loadLikeButton(comments[index]);
            }
        }
    }

    function assignUserToComment(index, userId) {
        ProfilesService.getUserProfile(userId).then(function (res) {
            $scope.allComments[index].user = res.data;
        });
    }

    function loadLikeButton(comment) {
        $scope.isCurrentCommentLiked[comment._id] = (currentUserId && comment.likes.indexOf(currentUserId) >= 0);
    }

    $rootScope.$watch('userId', function (newValue) {
        if ($location.url().includes(TV_SHOW_PAGE_PATH)) {
            if (newValue) {
                currentUserId = $rootScope.userId;
                fillCollectionsButtons();
                refreshAllCommentsLikes();
            } else {
                clearUserData();
            }
        }
    });

    SingleShowService.getShowData($routeParams.showId).then(function (res) {
        $scope.show = res.data;
        $scope.currentSeason = res.data.seasons[res.data.seasons.length - 1];
        $scope.trailerVideo = $sce.trustAsHtml('<iframe width="560" height="349" src="' + res.data.trailer + '" allowfullscreen frameborder="0"></iframe>');
    });

    $scope.showEpisodes = function () {
        $scope.areEpisodesShown = true;
    };

    $scope.hideEpisodes = function () {
        $scope.areEpisodesShown = false;
    };

    $scope.changeSeason = function (index) {
        $scope.currentSeason = $scope.show.seasons[index];
        $scope.areEpisodesShown = false;
    };

    $scope.navigateToSeasons = function () {
        $scope.areCommentsOpen = false;
        $scope.areSeasonsOpen = true;
        $scope.isTrailerOpen = false;
    };

    $scope.navigateToComments = function () {
        $scope.areCommentsOpen = true;
        $scope.areSeasonsOpen = false;
        $scope.isTrailerOpen = false;
    };

    $scope.navigateToTrailer = function () {
        $scope.areCommentsOpen = false;
        $scope.areSeasonsOpen = false;
        $scope.isTrailerOpen = true;
    };

    $scope.addToFavorites = function () {
        if (currentUserId) {
            SingleShowService.favoritesAction(currentUserId, $routeParams.showId);
            $scope.isShowFavorite = !$scope.isShowFavorite;
        } else {
            $rootScope.openPopupBox();
        }
    };

    $scope.addToWatchlist = function () {
        if (currentUserId) {
            SingleShowService.watchlistAction(currentUserId, $routeParams.showId);
            $scope.isShowWatched = !$scope.isShowWatched;
        } else {
            $rootScope.openPopupBox();
        }
    };

    $scope.addComment = function () {
        if (currentUserId) {
            var text = $scope.commentMessage.text;
            if (text.trim()) {
                CommentsService.addComment(currentUserId, $routeParams.showId, text).then(function (res) {
                    $scope.allComments.unshift(res.data);
                    $scope.allComments[0].datePosted = MainService.formatDateString($scope.allComments[0].date);
                    $scope.commentMessage.text = '';
                    assignUserToComment(0, currentUserId);
                });
            }
        } else {
            $rootScope.openPopupBox();
        }
    };

    $scope.likeAction = function (comment) {
        if (currentUserId) {
            if (comment.likes.indexOf(currentUserId) >= 0) {
                CommentsService.removeLikeAction(currentUserId, comment._id).then(
                    function (res) {
                        if (res.data.toString() === LIKE_REMOVED_CONFIRM) {
                            comment.likes.splice(comment.likes.indexOf(currentUserId), 1);
                            $scope.isCurrentCommentLiked[comment._id] = false;
                        }
                    });
            } else {
                CommentsService.addLikeAction(currentUserId, comment._id).then(
                    function (res) {
                        if (res.data.toString() === LIKE_ADDED_CONFIRM) {
                            comment.likes.push(currentUserId);
                            $scope.isCurrentCommentLiked[comment._id] = true;
                        }
                    });
            }
        } else {
            $rootScope.openPopupBox();
        }
    };
}]);