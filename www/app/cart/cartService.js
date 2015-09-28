angular.module('cart', ['utilities'])

.factory('cartService', function(Utils, $rootScope, $http, ApiEndpoint, Utils) {

  var products = [];

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    setProducts: function(value) {
      products = Utils.arrayUnique(products.concat(value));
    },
    getProducts: function() {
      //return angular.copy(products);
      if(products) {
        return products.filter(function (p) {
          return Number(p.qty) > 0;
        });  
      }
    },
    clearProducts: function() {
      products = [];
    }
  }; 

  $rootScope.$on('resetSessionData', function () {
    clearProducts();
  });
});