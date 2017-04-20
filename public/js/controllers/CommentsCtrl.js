angular.module('CommentsCtrl', []).controller('CommentsController', ['$scope', 'Comments', function($scope, Comments) {
    Comments.getUserProfile().then(function(res) {
        $scope.user = res.data;
    });
}]);