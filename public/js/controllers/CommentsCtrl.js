angular.module('CommentsCtrl', []).controller('CommentsController', ['$scope', 'Comments', 'Profiles', function ($scope, Comments, Profiles) {
    Comments.getComments().then(function (res) {
        var comments = res.data;
        var users = [];
        for (var index = 0; index < res.data.length; index++) {
            Profiles.getUserProfile(res.data[index].userId).then(function (res) {
                users[index] = res.data;
            });
        }
        console.log(users);
        $scope.allComments = comments;
        $scope.users = users;
    });
}]);