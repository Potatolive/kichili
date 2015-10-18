angular.module('woocommerceResource', ['utilities']);
angular.module('woocommerceResource').factory('woocommerceResource', ['ApiEndpoint','$http', function (ApiEndpoint, $http) {

  function WoocommerceResourceFactory(collectionName) {

    var authHeader = ApiEndpoint.authHeader;
    var url = ApiEndpoint.url + '/wordpress/wc-api/v3/' + collectionName;
    
    var thenFactoryMethod = function (httpPromise, successcb, errorcb, isArray) {
      var scb = successcb || angular.noop;
      var ecb = errorcb || angular.noop;

      return httpPromise.then(function (response) {
        var result = new Resource(response.data);
        scb(result, response.status, response.headers, response.config);
        return result;
      }, function (response) {
        ecb(undefined, response.status, response.headers, response.config);
        return undefined;
      });
    };

    var Resource = function (data) {
      angular.extend(this, data);
    };

    Resource.all = function (cb, errorcb) {
      console.log('queriing...');
      return Resource.query({}, cb, errorcb);
    };

    Resource.query = function (queryJson, successcb, errorcb) {
      $http.defaults.headers.common['Authorization'] = authHeader;
      var httpPromise = $http({method: 'GET', cache: true, url: url});
      return thenFactoryMethod(httpPromise, successcb, errorcb, true);
    };

    return Resource;
  }
  return WoocommerceResourceFactory;
}]);
