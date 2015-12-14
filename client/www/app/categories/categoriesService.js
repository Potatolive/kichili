angular.module('categories', ['utilities'])

.factory('categoriesService', function($http, ApiEndpoint) {

var categories;

var getData = function() {
  $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  console.log(ApiEndpoint.url + '/products/categories');
  return $http({method: 'GET', cache: true, url: ApiEndpoint.url + '/wc-api/v3/products/categories'}).
    success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      return data;
    });
  };

  //getData();

// Might use a resource here that returns a JSON array
// Some fake testing data
  return {
    all: getData
  };
});