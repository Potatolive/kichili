angular.module('resources.categories', []);
angular.module('resources.categories').factory('Categories', ['woocommerceResource', function (woocommerceResource) {
  console.log('here');
  var categoryResource = woocommerceResource('products/categories');
  return categoryResource;
}]);