angular.module('cart')

.controller('cartCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, $rootScope, cartService, Utils) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  var init = function() {
    $scope.products = [];
    cartService.clearProducts();
    $scope.deliveryInfo = {};
    $scope.deliveryInfo.city = "Chennai";
    $scope.deliveryInfo.state = "TN";
    $scope.deliveryInfo.country = "India";
    $scope.deliveryInfo.valid = true;
  }

  $scope.$on('$ionicView.enter', function(e) {
    $scope.products = cartService.getProducts();
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

  $scope.cartProducts = function() {
    var products = $scope.products;
    if(products) {
      return products.filter(function (p) {
        return Number(p.qty) > 0;
      });  
    }
  }

  init();  

  $scope.placeOrder = function(form) {
    if(form.$valid) {
      $ionicLoading.show({
        template: 'Submiting...'
      });
      
      var placedOrder = cartService.placeOrder($scope.deliveryInfo);
      placedOrder.then(function(result) {
        continueExecution();
      });
    }
    else {
      $scope.deliveryInfo.valid = form.$valid;
    }
  }

  continueExecution = function() {
    init();
    $rootScope.$broadcast('resetSessionData');
    $ionicLoading.hide();
    $state.go('app.orderTracking');
  }

});