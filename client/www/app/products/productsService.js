angular.module('products', ['utilities'])

.factory('productsService', function(Utils, $http, ApiEndpoint, Authentication) {

  var pageNumber = -1;
  var pageSize = 20;
  var noMoreItemsAvailable = false;

  var getData = function(categorId) {
   $http.defaults.headers.common.Authorization = 'Basic ' + window.btoa(Authentication.ck + ':' + Authentication.cs);

  var url = ApiEndpoint.url + '/wc-api/v3/products?consumer_key=' + Authentication.ck + '&consumer_secret=' + Authentication.cs;

    var encodedCategory = '';

    if(categorId) {
      encodedCategory = escape(categorId.replace(/&amp;/g, '&'));
      console.log(encodedCategory);
    }
    
    pageNumber++;

    return $http({method: 'GET', cache: false, url: url + '&filter[category]=' + encodedCategory + '&filter[limit]=' + pageSize + '&page=' + pageNumber }).
      success(function(data, status, headers, config) {
        if(!data || !data.products || data.products.length == 0) noMoreItemsAvailable = true;
        return data;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  };

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    init: function() {
      pageNumber = 0;
    },
    isMoreItemsAvailable: function() {
      return !noMoreItemsAvailable;
    },
    getData: getData,
    explodeVariation: function(products) {

      if(!products) return products;

      products.forEach(function(product){
        var variations = product.variations;
        if(variations) {
          //var variationOptions = [];
          var options = {};
          variations.forEach(function(variation){
            var attributes = variation.attributes;
            if(attributes) {
              attributes.forEach(function(attribute) {
                var option = {"name": attribute.name, "options": {}};
                var variation = {"name": attribute.option};

                if(!options[option.name]) {
                  option.options[variation.name] = variation;
                  options[option.name] = option;  
                }
                else {
                  if(!options[option.name].options[variation.name]) {
                    options[option.name].options[variation.name] = variation;     
                  }
                }
              });
            }
          });
          product.options = options;  
        }
        
      });
      
      return products;
    }
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