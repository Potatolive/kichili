angular.module('cart')

.controller('cartCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, $rootScope, cartService, regionService, Utils) {

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
    $scope.error = {};
  }

  $scope.$on('$ionicView.enter', function(e) {
    $scope.products = cartService.getProducts();
    console.log(regionService.getPinCode());
    $scope.deliveryInfo.postcode = Number(regionService.getPinCode());

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
    if (!product.variations || product.variations.length == 0) {
      return product.sale_price;
    }
    else if (product.variations && product.variations.length > 0 && product.selectedVariation) {
      return product.selectedVariation.sale_price;
    }
  }

  $scope.totalPrice = function(product) {
    return (Number(product.qty) * Number($scope.price(product))).toFixed(2);
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

  $scope.cartTotal = function() {
    var cartProducts = $scope.products;
    var total = 0;
    if(cartProducts) {
      cartProducts.forEach(function(product){
        var price = $scope.selectedVariation(product);
        total = (Number(total) + (Number(product.qty) * Number(price.sale_price))).toFixed(2);
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
      placedOrder.then(
        function(success) {
          console.log(success);

          var orders

          if(window.localStorage['orders'] && window.localStorage['orders'] != null) {
             orders = JSON.parse(window.localStorage['orders']);
          }

          if(!!!orders) {
            orders = [];
          }

          orders.push(success.data.order);

          window.localStorage['orders'] = JSON.stringify(orders);
          
          continueExecution();
          $ionicLoading.hide();
        },
        function(error) {
          $scope.error.message = "Cannot place order at this moment. Please try later!"
          $ionicLoading.hide();
        }
      );
    }
    else {
      $scope.deliveryInfo.valid = form.$valid;
    }
  }

  continueExecution = function() {
    init();
    $rootScope.$broadcast('resetSessionData');
    $state.go('app.orderTracking');
  }

});