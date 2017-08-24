app.directive('navigationMenu', ['$location', function ($location) {
    function switchActiveClass(path, links, activeClass) {
        links.parent('li').removeClass(activeClass);

        if (path) {
            path.parent('li').addClass(activeClass);
        }
    }

    return function (scope, element, attributes) {
        var links = element.find('a');
        var urlMap = {};
        var activeClass = attributes.navigationMenu || 'active';

        for (var index = 0; index < links.length; index++) {
            var link = angular.element(links[index]);
            var url = link.attr('href');

            if (url.substring(0, 1) === '#') {
                urlMap[url.substring(1)] = link;
            } else {
                urlMap[url] = link;
            }
        }

        // For mobile navigation
        switchActiveClass(urlMap[$location.path()], links, activeClass);

        // For desktop navigation
        scope.$on('$routeChangeStart', function () {
            switchActiveClass(urlMap[$location.path()], links, activeClass);
        });
    };
}]);