app.directive('errorSource', function () {
    return {
        restrict: 'A',

        link: function (scope, element, attributes) {
            element.bind('error', function () {
                if (attributes.src !== attributes.errorSource) {
                    attributes.$set('src', attributes.errorSource);
                }
            });
        }
    }
});