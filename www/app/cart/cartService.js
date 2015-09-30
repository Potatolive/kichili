angular.module('cart', ['utilities'])

.factory('cartService', function(Utils, $rootScope, $http, ApiEndpoint, Utils) {

  var products = [];

  var sampleOrder = {
    "order": {
      "payment_details": {
        "method_id": "COD",
        "method_title": "Cash On Delivery",
        "paid": true
      },
      "billing_address": {
        "first_name": "Ganesan",
        "last_name": "",
        "address_1": "GB, Sivas Jayam",
        "address_2": "Ashok Nagar",
        "city": "Chennai",
        "state": "TN",
        "postcode": "600083",
        "country": "India",
        "email": "rahul.illam@gmail.com",
        "phone": "9380584995"
      },
      "shipping_address": {
        "first_name": "Ganesan",
        "last_name": "",
        "address_1": "GB, Sivas Jayam",
        "address_2": "Ashok Nagar",
        "city": "Chennai",
        "state": "TN",
        "postcode": "600083",
        "country": "India",
        "email": "rahul.illam@gmail.com",
        "phone": "9380584995"
      },
      "customer_id": 0,
      "line_items": [
        /*{
          "product_id": 118,
          "quantity": 2
        }*/
      ]
    }
  }

  var postOrder = function(order) {
    $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;

    return $http({method: 'POST', url: ApiEndpoint.url + '/wordpress/wc-api/v3/orders', data: order, headers: {'Content-Type': 'application/json'}}).
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
    setProducts: function(value) {
      products = Utils.arrayUnique(products.concat(value));
    },
    getProducts: function() {
      //return angular.copy(products);
      if(products) {
        return products.filter(function (p) {
          return Number(p.qty) > 0;
        });  
      }
    },
    clearProducts: function() {
      products = [];
    },
    placeOrder: function(deliveryInfo) {
      console.log("Order Submission");
      console.log(products);
      console.log(deliveryInfo);

      var order = sampleOrder;

      console.log(order.order.line_items);

      products.forEach(function(product){
        lineitem = {"product_id": product.id, "quantity": product.qty}
        order.order.line_items.push(lineitem);
        console.log(lineitem);
      });

      console.log(order);

      return postOrder(order);
    }
  }; 

  $rootScope.$on('resetSessionData', function () {
    clearProducts();
  });

});