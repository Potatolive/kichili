// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ng-cordova', 'utilities', 'login', 'categories', 'products', 'cart'])

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
.state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'app/categories/_home.html',
        controller: 'categoriesCtrl'
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
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
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
  urlRemote: 'https://ec2-52-10-172-118.us-west-2.compute.amazonaws.com',
  url: 'http://localhost:8100/api',
  authHeader: 'Basic ' + window.btoa('ck_923d20802ff5dfac3a720c75c7b1ec6552ae4884:cs_3f9debcce875917a60349bd3d4cac0209807e584')
});