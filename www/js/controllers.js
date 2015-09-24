angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, Categories) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.categories = Categories.all();

  $scope.go = function ( id ) {
    $state.go('app.products', {categoryId: id});
  };

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ProductsCtrl', function($scope, $stateParams, $state, $ionicLoading, Products, focus, Utils) {
  $scope.init = function() {
    $scope.category = {};
    $scope.search = {};
    $scope.deliveryInfo = {};
    $scope.deliveryInfo.valid = true;
  }
  
  $scope.init();

  $scope.category.categoryId = $stateParams.categoryId;

  $scope.products = Products.all($scope.category.categoryId);

  $scope.cart = function() {
    return $scope.products.filter(function (p) {
        return Number(p.qty) > 0;
      });
  }

  $scope.cartTotal = function() {
    var cartProducts = $scope.cart();
    var total = 0;
    cartProducts.forEach(function(product){
      total = (Number(total) + (Number(product.qty) * Number(product.sellingPrice))).toFixed(2);
    });
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
  
  /*$scope.$watch('delivery.$valid', function(newVal) {
      $scope.deliveryInfo.valid = newVal;
  });*/

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ContentController', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }
});
