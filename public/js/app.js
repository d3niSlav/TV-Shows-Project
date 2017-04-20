angular.module('tvShowsApp', [
    'ngRoute',
    'appRoutes',
    'MainCtrl',
    'AllShowsCtrl', 'AllShowsService',
    'UsersCtrl', 'UsersService',
    'ProfilesCtrl', 'ProfilesService',
    'CommentsCtrl', 'CommentsService',
    'SingleShowCtrl', 'SingleShowService'
]);