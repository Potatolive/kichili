angular.module('categories')

.controller('categoriesCtrl', function($scope, $ionicModal, $ionicLoading, $ionicPopup, $timeout, $state, categoriesService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $ionicLoading.show({
    template: 'Loading...'
  });
  var categoriesServicePromise = categoriesService.all();
  categoriesServicePromise.then(function(result) {
    categories = result.data.product_categories;
    $scope.categories = categories;
    $ionicLoading.hide();
  }, function(error) {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Error',
     template: JSON.stringify(error)
   });
   confirmPopup.then(function(res) {
     if(res) {
       console.log('You are sure');
     } else {
       console.log('You are not sure');
     }
   });
   $ionicLoading.hide();
  });

  $scope.go = function ( id ) {
    $state.go('app.products', {categoryId: id});
  };

});