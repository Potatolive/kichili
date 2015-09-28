angular.module('products')

.controller('productsCtrl', function($scope, $stateParams, $state, $rootScope, $ionicLoading, $ionicScrollDelegate, productsService, cartService, focus, Utils) {
  $scope.init = function() {
    $scope.category = {};
    $scope.search = {};
    $scope.deliveryInfo = {};
    $scope.deliveryInfo.valid = true;
  }
  
  $scope.init();

  $scope.category.categoryId = $stateParams.categoryId;

  var getData = productsService.getData($scope.category.categoryId);
  getData.then(function(result, $ionicScrollDelegate) {
    
    var catalogProducts = result.data.products;
    
    /*var cartProducts = cartService.getProducts().filter(
        function (el) {
          el.categories.forEach(
              function(obj, id) {
                if(obj === $scope.category.categoryId) return true;
              }
            ); 
          return false;
        }
      );

    
    $scope.products = angular.merge(catalogProducts, cartProducts);

    console.log('cart products');
    console.log(cartProducts);

    */

    $scope.products = catalogProducts;

    $state.go($state.current, {}, {reload: true});
  });

  //$scope.products = Products.all($scope.category.categoryId);

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

  continueExecution = function() {
    $scope.init();
    $ionicLoading.hide();
    $state.go('app.home');
  }

  $rootScope.$on("$stateChangeSuccess", function (event, next, current) {
     console.log('Preserving Data (Product)...');
     cartService.setProducts($scope.cartProducts()); 
  });

});
