angular.module('orderTracking', ['utilities'])

.factory('orderTrackingService', function(Utils, $rootScope, $http, ApiEndpoint) {

  var getData = function(orderId) {
    $http.defaults.headers.common.Authorization = ApiEndpoint.authHeader;

    return $http({method: 'GET', cache: false, url: ApiEndpoint.url + '/wc-api/v3/orders/' + orderId}).
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
    getOrders: function() {
      var orders;

      if(window.localStorage.orders && window.localStorage.orders !== null) {
         orders = JSON.parse(window.localStorage.orders);
      }

      if(!!!orders) {
        orders = [];
      }

      return orders;
    },
    getOrderStatus: function(orderId) {
      return getData(orderId);
    }
  }; 

});