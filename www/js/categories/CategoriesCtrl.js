angular.module('starter.controllers')

.controller('CategoriesCtrl', function($scope, $ionicModal, $timeout, $state, Categories) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var categoriesService = Categories.all();
  categoriesService.then(function(result) {
    categories = result.data.product_categories;
    $scope.categories = categories;
  });

  $scope.go = function ( id ) {
    $state.go('app.products', {categoryId: id});
  };

});