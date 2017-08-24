app.directive('showStatus', [ function () {
    return {
        restrict: 'EA',

        templateUrl: './js/directives/show-status.html',

        link: function (scope, element, attributes) {
            var statuses = {
                'unknown': { title: 'Unknown', type: 'unknown', icon: 'fa-question-circle-o'},
                'on-air': { title: 'On air', type: 'on-air', icon: 'fa-play-circle-o'},
                'canceled': { title: 'Canceled', type: 'canceled', icon: 'fa-window-close-o'},
                'renewed': { title: 'Renewed', type: 'renewed', icon: 'fa-check-square-o'},
                'finished': { title: 'Finished', type: 'finished', icon: 'fa-flag-checkered'}
            };

            var currentStatus = attributes.currentStatus || 'unknown';
            scope.status = statuses[currentStatus];
        }
    }
}]);