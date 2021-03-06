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

  $scope.isVariationSelectect = function(product) {
    return (!product.variations || product.variations.length == 0 || (product.variations && product.variations.length > 0 && product.selectedVariation));
  }

  $scope.selectedVariation = function(product) {
    var price = {"regular_price": product.regular_price, "sale_price": product.sale_price};
    if(product.variations && product.variations.length > 0) {
      product.selectedVariation = undefined;
      product.variations.forEach(function(variation) {
        var variationFound = variation.attributes && variation.attributes.length > 0;
        if(variationFound) {
          variation.attributes.forEach(function(attribute) {
            if(!product.options[attribute.name].selectedItem || product.options[attribute.name].selectedItem.name != attribute.option) {
              variationFound = false;
            }
          });
          if(variationFound) {
            price.regular_price = variation.regular_price;
            price.sale_price = variation.sale_price;
            product.selectedVariation = variation;
            return price;
          }  
        }
      });
      if(!product.selectedVariation) product.qty = 0;
    }
    return price;
  }

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
        var price = $scope.selectedVariation(product);
        total = (Number(total) + (Number(product.qty) * Number(price.sale_price))).toFixed(2);
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
      console.log($scope.cartProducts());
      cartService.setProducts($scope.cartProducts());
    }
  });

  $rootScope.$on('resetSessionData', function () {
    $scope.resetSession = true;
    $scope.init();     
  });

});
