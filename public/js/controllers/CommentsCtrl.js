angular.module('CommentsCtrl', []).controller('CommentsController', ['$scope', 'Comments', 'Profiles', function($scope, Comments, Profiles) {
    Comments.getComments().then(function(res) {
        var comments = res.data;

        function assignUserToComment(index, userId) {
            Profiles.getUserProfile(userId).then(function(res) {
                $scope.allComments[index].user = res.data;
            });
        }

        for (var index = 0; index < comments.length; index++) {
            assignUserToComment(index, comments[index].userId);
        }

        $scope.allComments = comments;
    });
}]);