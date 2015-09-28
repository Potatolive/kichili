angular.module('cart', ['utilities'])

.factory('cartService', function(Utils, $http, ApiEndpoint, Utils) {

  var products = [];

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    setProducts: function(value) {
      console.log('Before');
      if(products && products[0]) 
      {
        console.log(products[0].title);
        console.log(products[0].$$hashKey);
        console.log(products[0].id);
        console.log(products);
      }
      
      products = Utils.arrayUnique(products.concat(value));
      console.log('After');
      
      if(products && products[0]) 
      {
        console.log(products[0].title);
        console.log(products[0].$$hashKey);
        console.log(products[0].id);
        console.log(products);
      }
    },
    getProducts: function() {
      return angular.copy(products);
    }
  }; 
});