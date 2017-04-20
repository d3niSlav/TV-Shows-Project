angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.htm',
            controller: 'MainController'
        })
        .when('/show', {
            templateUrl: 'views/show.htm',
            controller: 'MainController'
        })
        .when('/login', {
            templateUrl: 'views/login.htm',
            controller: 'UsersController'
        })
        .when('/register', {
            templateUrl: 'views/register.htm',
            controller: 'UsersController'
        })
        .when('/browse', {
            templateUrl: 'views/browse.htm',
            controller: 'AllShowsController'
        })
        .when('/show/:showId', {
            templateUrl: 'views/show.htm',
            controller: 'SingleShowController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.htm',
            controller: 'ProfilesController'
        })
        .when('/comment', {
            templateUrl: 'views/comment.htm',
            controller: 'CommentsController'
        });
    $locationProvider.html5Mode(true);
}]);