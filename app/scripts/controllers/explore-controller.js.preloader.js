'use strict';

angular.module('aquiferiumApp')
  .controller('ExploreCtrl', ['$scope', function ($scope, preloader) {
    $scope.pageClass = 'explore';

    // I keep track of the state of the loading images.
    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    // Images to load.
    // NOTE: "cache" attribute is to prevent images from caching in the browser (for the sake of the demo).
    $scope.imageLocations = [
      ( "./ahhh.jpg?v=1&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=2&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=3&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=4&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=5&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=6&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=7&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=8&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=9&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=10&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=11&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=12&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=13&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=14&cache=" + ( new Date() ).getTime() ),
      ( "./ahhh.jpg?v=15&cache=" + ( new Date() ).getTime() )
    ];

    // Preload the images; then, update display when returned.
    preloader.preloadImages( $scope.imageLocations ).then(
      function handleResolve( imageLocations ) {
        // Loading was successful.
        $scope.isLoading = false;
        $scope.isSuccessful = true;
        console.info( "Preload Successful" );
      },
      function handleReject( imageLocation ) {
        // Loading failed on at least one image.
        $scope.isLoading = false;
        $scope.isSuccessful = false;
        console.error( "Image Failed", imageLocation );
        console.info( "Preload Failure" );
      },
      function handleNotify( event ) {
        $scope.percentLoaded = event.percent;
        console.info( "Percent loaded:", event.percent );
      }
    );

  }]);
