angular.module('starter.controllers')

.controller('ProductsCtrl', function($scope, $stateParams, $state, $ionicLoading, $ionicScrollDelegate, Products, focus, Utils) {
  $scope.init = function() {
    $scope.category = {};
    $scope.search = {};
    $scope.deliveryInfo = {};
    $scope.deliveryInfo.valid = true;
  }
  
  $scope.init();

  $scope.category.categoryId = $stateParams.categoryId;

  var productsService = Products.getData($scope.category.categoryId);
  productsService.then(function(result, $ionicScrollDelegate) {
    $scope.products = result.data.products;
    $state.go($state.current, {}, {reload: true});
  });

  //$scope.products = Products.all($scope.category.categoryId);

  $scope.cart = function() {
    if($scope.products) {
      console.log('Cart Product: ' + $scope.products);
      return $scope.products.filter(function (p) {
        return Number(p.qty) > 0;
      });
    }
  }

  $scope.cartTotal = function() {
    var cartProducts = $scope.cart();
    var total = 0;
    if(cartProducts) {
      cartProducts.forEach(function(product){
        total = (Number(total) + (Number(product.qty) * Number(product.sellingPrice))).toFixed(2);
      });  
    }
    
    return Utils.formatIndianRupee(total);
  }

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

  $scope.go = function ( path ) {
    $state.go(path);
  };


  $scope.search.searchMode = false;
  $scope.search.searchText = '';

  $scope.search.searchModeOn = function() {
    $scope.search.searchMode = true;
    focus('searchText');
    $scope.search.searchText = '';
  };

  $scope.search.searchModeOff = function() {
    $scope.search.searchMode = false;
    $scope.search.searchText = '';
  };

  $scope.price = function(product) {
    return Products.price(product);
  }

  $scope.placeOrder = function(form) {
    if(form.$valid) {
      $ionicLoading.show({
        template: 'Submiting...'
      });
      setTimeout(continueExecution, 10000) //wait ten seconds before continuing
    }
    else {
      $scope.deliveryInfo.valid = form.$valid;
    }
    
  }

  continueExecution = function() {
    $scope.init();
    Products.reset();
    $ionicLoading.hide();
    $state.go('app.home');
  }
});