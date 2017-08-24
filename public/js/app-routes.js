angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'UsersController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'UsersController'
        })
        .when('/forgotten-password', {
            templateUrl: 'views/forgotten-password.html',
            controller: 'UsersController'
        })
        .when('/reset-password/:token', {
            templateUrl: 'views/reset-password.html',
            controller: 'UsersController'
        })
        .when('/browse', {
            templateUrl: 'views/browse.html',
            controller: 'AllShowsController'
        })
        .when('/newest', {
            templateUrl: 'views/newest-shows.html',
            controller: 'NewestShowsController'
        })
        .when('/ranking', {
            templateUrl: 'views/ranking.html',
            controller: 'RankingController'
        })
        .when('/schedule', {
            templateUrl: 'views/schedule.html',
            controller: 'ScheduleController'
        })
        .when('/show/:showId', {
            templateUrl: 'views/single-show.html',
            controller: 'SingleShowController'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfilesController'
        })
        .when('/contacts', {
            templateUrl: 'views/contact-us.html',
            controller: 'ContactUsController'
        })
        .when('/search', {
            templateUrl: 'views/search.html',
            controller: 'SearchController'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/futureDev', {
            templateUrl: 'views/future-development.html'
        });
    $locationProvider.html5Mode(true);
}]);