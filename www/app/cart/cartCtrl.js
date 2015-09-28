angular.module('cart')

.controller('cartCtrl', function($scope, $ionicModal, $timeout, $state, cartService, Utils) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  $scope.$on('$ionicView.enter', function(e) {
    $scope.products = cartService.getProducts();
    console.log('Refresh Data');
    console.log($scope.products);
  });

  $scope.addQty = function(i) {
    var product = $scope.products[i];
    if(product.qty) product.qty++;
    else product.qty = 1;
  };

  $scope.reduceQty = function(i) {
    var product = $scope.products[i];
    if(product.qty > 1) product.qty--;
    else product.qty = 0;
  };

  $scope.price = function(product) {
    return (Number(product.qty) * Number(product.sale_price)).toFixed(2);
  }

  $scope.cartTotal = function() {
    var cartProducts = $scope.products;
    var total = 0;
    if(cartProducts) {
      cartProducts.forEach(function(product){
        total = (Number(total) + (Number(product.qty) * Number(product.sale_price))).toFixed(2);
      });  
    }
    
    return Utils.formatIndianRupee(total);
  }

});