angular.module('starter.services')

.factory('Products', function(Utils) {

  var productsOriginal = [
    {
      id: 1,
      name: "Boiled Rice - Ponni",
      imgUrl: "",
      company: "BP Royal",
      categoryId: 1,
      availableSize: {
        "type": "select", 
        "name": "availableSize",
        "value": "10 kg - bag", 
        "values": ["5 kg - bag", "10 kg - bag", "15 kg - bag"],
      },
      price: "595",
      currency: "INR",
      sellingPrice: "542.9",
    },
    {
      id: 2,
      name: "Moong Dal",
      imgUrl: "",
      company: "BP Royal",
      categoryId: 1,
      availableSize: {
        "type": "select", 
        "name": "availableSize",
        "value": "10 kg - bag", 
        "values": ["5 kg - bag", "10 kg - bag", "15 kg - bag"],
      },
      price: "695",
      currency: "INR",
      sellingPrice: "442.9", 
    },
  ];

  var products = angular.copy(productsOriginal);

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    all: function() {
      return products;
    },
    price: function(product) {
      var x=(Number(product.qty) * Number(product.sellingPrice)).toFixed(2);
      return Utils.formatIndianRupee(x);
    },
    cart: function() {
      return products.filter(function (p) {
        return Number(p.qty) > 0;
      });
    },
    reset: function() {
      products = angular.copy(productsOriginal);
    }
  }; 
})

.factory('focus', function($timeout, $window) {
    return function(id) {
      // timeout makes sure that it is invoked after any other event has been triggered.
      // e.g. click events that need to run before the focus or
      // inputs elements that are in a disabled state but are enabled when those events
      // are triggered.
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if(element)
          element.focus();
      });
    };
  });