 angular.module('CarouselCtrl', []).controller('CarouselController', ['$scope', 'AllShows', function($scope, AllShows) {
     AllShows.getAllShows().then(function(res) {
         $scope.shows = res.data
         $(document).ready(function() {

             $('.slider').slick({
                 centerMode: true,
                 centerPadding: '60px',
                 slidesToShow: 5,
                 responsive: [{
                         breakpoint: 992,
                         settings: {
                             arrows: true,
                             centerMode: true,
                             centerPadding: '40px',
                             slidesToShow: 3
                         }
                     },
                     {
                         breakpoint: 480,
                         settings: {
                             arrows: false,
                             centerMode: true,
                             centerPadding: '40px',
                             slidesToShow: 1
                         }
                     }
                 ]
             });
         });
     });
 }]);