angular.module('starter.services')

.factory('Categories', function($http, ApiEndpoint) {

var categories;

var getData = function() {
  $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;
  console.log(ApiEndpoint.url + '/products/categories');
  return $http({method: 'GET', cache: true, url: ApiEndpoint.url + '/wordpress/wc-api/v3/products/categories'}).
    success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      //alert(data);
      console.log(data);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  };

  //getData();

// Might use a resource here that returns a JSON array
// Some fake testing data
  return {
    all: getData
  };
});