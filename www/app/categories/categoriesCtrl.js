angular.module('categories')

.controller('categoriesCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, categoriesService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicLoading.show({
    template: 'Loading...'
  });
  var categoriesService = categoriesService.all();
  categoriesService.then(function(result) {
    categories = result.data.product_categories;
    $scope.categories = categories;
    $ionicLoading.hide();
  });

  $scope.go = function ( id ) {
    $state.go('app.products', {categoryId: id});
  };

});