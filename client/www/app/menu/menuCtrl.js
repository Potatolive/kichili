angular.module('menu', ['utilities'])

.controller('menuCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, categoriesService, orderTrackingService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var categoriesServicePromise = categoriesService.all();
  categoriesServicePromise.then(function(result) {
    categories = result.data.product_categories;
    $scope.categories = categories;
  });

  orders = orderTrackingService.getOrders();

  $scope.hasOrders = function() {
    return (!!orders && orders.length > 0);
  };

  $scope.go = function ( id ) {
    $state.go('app.products', {categoryId: id});
  };

});