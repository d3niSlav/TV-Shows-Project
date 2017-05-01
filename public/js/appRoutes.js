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
        .when('/newest', {
            templateUrl: 'views/newest.htm',
            controller: 'NewestShowsController'
        })
        .when('/ranking', {
            templateUrl: 'views/highScores.htm',
            controller: 'RankingController'
        })
        .when('/schedule', {
            templateUrl: 'views/schedule.htm',
            controller: 'ScheduleController'
        })
        .when('/show/:showId', {
            templateUrl: 'views/show.htm',
            controller: 'SingleShowController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.htm',
            controller: 'ProfilesController'
        })
        .when('/contacts', {
            templateUrl: 'views/contactUs.htm',
            controller: 'ContactUsController'
        }).when('/search', {
            templateUrl: 'views/search.htm',
            controller: 'SearchController'
        })
         .when('/about', {
            templateUrl: 'views/about.htm'
        });
    $locationProvider.html5Mode(true);
}]);