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
    explodeVariation: function(products) {

      console.log('expoding variations');
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
          console.log(options);
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