angular.module('orderTracking', ['utilities'])

.factory('orderTrackingService', function(Utils, $rootScope, $http, ApiEndpoint, Utils) {

  var getData = function(categorId) {
    $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;

    return $http({method: 'GET', cache: false, url: ApiEndpoint.url + '/wordpress/wc-api/v3/orders'}).
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

});