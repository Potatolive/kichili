// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ng-cordova', 'utilities', 'region', 'login', 'categories', 'products', 'cart', 'orderTracking'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/categories/_menu.html',
    controller: 'categoriesCtrl'
  })
.state('app.categories', {
    url: '/categores',
    views: {
      'menuContent': {
        templateUrl: 'app/categories/_home.html',
        controller: 'categoriesCtrl'
      }
    }
  })
  .state('app.region', {
      url: '/region',
      views: {
        'menuContent': {
          templateUrl: 'app/region/_pincode.html',
          controller: 'regionCtrl'
        }
      }
  })
  .state('app.products', {
      url: '/products/:categoryId',
      views: {
        'menuContent': {
          templateUrl: 'app/products/_products.html',
          controller: 'productsCtrl'
        }
      }
  })
  .state('app.checkout', {
      url: '/checkout',
      views: {
        'menuContent': {
          templateUrl: 'app/cart/_checkout.html',
          controller: 'cartCtrl'
        }
      }
  })
  .state('app.orderTracking', {
      url: '/orderTracking',
      views: {
        'menuContent': {
          templateUrl: 'app/ordertracking/_ordertracking.html',
          controller: 'orderTrackingCtrl'
        }
      }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/region');
})

.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
      elem.on(attr.eventFocus, function() {
        focus(attr.eventFocusId);
      });

      // Removes bound events in the element itself
      // when the scope is destroyed
      scope.$on('$destroy', function() {
        elem.off(attr.eventFocus);
      });
    };
  })

.directive( 'goClick', function ( $location ) {
  return function ( scope, element, attrs ) {
    var path;

    attrs.$observe( 'goClick', function (val) {
      path = val;
    });

    element.bind( 'click', function () {
      scope.$apply( function () {
        $location.path( path );
      });
    });
  };
})

.constant('ApiEndpoint', {
  urlLocal: 'http://localhost:8100/api',
  urlRemote: 'https://ec2-52-88-140-24.us-west-2.compute.amazonaws.com',
  url: 'https://ec2-52-88-140-24.us-west-2.compute.amazonaws.com',
  authHeader: 'Basic ' + window.btoa('ck_52c09bea2580a0308602af980e13e39a3eef54eb:cs_46d42626408ee30285ccd2841df56d999d0cf682')
});