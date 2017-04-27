angular.module('ProfilesCtrl', []).controller('ProfilesController', ['$scope', 'Profiles', function($scope, Profiles) {
    Profiles.getUserProfile().then(function(res) {
        $scope.user = res.data;
    });

     $scope.editProfile = function() {
        $('#userWatchedList').fadeOut();
        $('#userFavoriteList').fadeOut();
        $('#editProfileSection').fadeIn("slow");
    }

    $scope.cancelEditProfile = function() {
        $('#editProfileSection').fadeOut();
        $('#userWatchedList').fadeIn("slow");
        $('#userFavoriteList').fadeIn("slow");
        
    }
}]);