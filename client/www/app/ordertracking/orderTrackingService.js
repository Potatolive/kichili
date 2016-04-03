angular.module('orderTracking', ['utilities'])

.factory('orderTrackingService', function(Utils, $rootScope, $http, ApiEndpoint, Authentication) {

  var getData = function(orderId) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + window.btoa(Authentication.ck + ':' + Authentication.cs);
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    var url = ApiEndpoint.url + '/wc-api/v3/products/orders' + orderId + '?consumer_key=' + Authentication.ck + '&consumer_secret=' + Authentication.cs;


    return $http({method: 'GET', cache: false, url: url}).
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