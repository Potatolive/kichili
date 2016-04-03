angular.module('categories', ['utilities'])

.factory('categoriesService', function($http, ApiEndpoint, Authentication) {

var categories;

var getData = function() {
  $http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(Authentication.ck + ':' + Authentication.cs);
  $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  var url = ApiEndpoint.url + '/wc-api/v3/products/categories?consumer_key=' + Authentication.ck + '&consumer_secret=' + Authentication.cs;

  console.log((new Date()) + ' : ' + url);
  return $http(
      {
        method: 'GET', 
        cache: true, 
        url: url
      }
    ).
    success(function(data, status, headers, config) {
      console.log((new Date()) + 'Success: ' + data);
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log('Error: ' + data);
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