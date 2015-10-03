angular.module('products')

.controller('productsCtrl', function($scope, $stateParams, $state, $rootScope, $ionicScrollDelegate, $ionicLoading, productsService, cartService, focus, Utils) {
  $scope.init = function() {
    $scope.category = {};
    $scope.search = {};
    $scope.deliveryInfo = {};
    $scope.deliveryInfo.valid = true;
    $scope.resetSession = false;
    $scope.products = [];
    initData();
  }
  
  $scope.init();

  $scope.category.categoryId = '';  
  
  if($scope.category && $stateParams.categoryId) {
    $scope.category.categoryId = $stateParams.categoryId;  
  }
  

  function initData() { 
    $ionicLoading.show({
      template: 'Loading...'
    });
    var getData = productsService.getData($stateParams.categoryId);
    getData.then(function(result, $ionicScrollDelegate) {
      var catalogProducts = result.data.products;

      $scope.products = productsService.explodeVariation(catalogProducts);

      $state.go($state.current, {}, {reload: true});
      $ionicLoading.hide();
    });
  }

  //$scope.products = Products.all($scope.category.categoryId);

  $scope.key = function(obj){
        // some unique object-dependent key
        return obj.name; // just an example
  };

  $scope.cartProducts = function() {
    var products = $scope.products;
    if(products) {
      return products.filter(function (p) {
        return Number(p.qty) > 0;
      });  
    }
  }

  $scope.cartTotal = function() {
    var cartProducts = $scope.cartProducts();
    var total = 0;
    if(cartProducts) {
      cartProducts.forEach(function(product){
        total = (Number(total) + (Number(product.qty) * Number(product.sale_price))).toFixed(2);
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

  $scope.$on("$stateChangeSuccess", function (event, next, current) {
    if(!$scope.resetSession) {
      console.log('Preserving Data (Product)...');
      cartService.setProducts($scope.cartProducts());
    }
  });

  $rootScope.$on('resetSessionData', function () {
    $scope.resetSession = true;
    $scope.init();     
  });

});
