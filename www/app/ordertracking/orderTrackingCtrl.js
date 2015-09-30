angular.module('orderTracking')

.controller('orderTrackingCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, $rootScope, orderTrackingService, Utils) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  var init = function() {
    
  }

  $scope.$on('$ionicView.enter', function(e) {
    var service = orderTrackingService.getData();
      service.then(function(result) {
        orders = result.data.orders;
        $scope.orders = orders;
      });  
  });

});