angular.module('products', ['utilities'])

.factory('productsService', function(Utils, $http, ApiEndpoint) {

  var getData = function(categorId) {
    $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;

    var encodedCategory = '';

    if(categorId) {
      encodedCategory = escape(categorId.replace(/&amp;/g, '&'));
      console.log(encodedCategory);
    }
    
    return $http({method: 'GET', cache: false, url: ApiEndpoint.url + '/wordpress/wc-api/v3/products?filter[category]=' + encodedCategory}).
    success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log(data);
    });
  };

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    getData: getData,
  }; 
})

.factory('focus', function($timeout, $window) {
    return function(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  });