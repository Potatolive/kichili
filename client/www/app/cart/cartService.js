angular.module('cart', ['utilities'])

.factory('cartService', function(Utils, $rootScope, $http, ApiEndpoint, Utils) {

  var products = [];

  var sampleOrder = {
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
    };

  var postOrder = function(order) {
    $http.defaults.headers.common['Authorization'] = ApiEndpoint.authHeader;

    return $http({method: 'POST', url: ApiEndpoint.url + '/wordpress/wc-api/v3/orders', data: {'order': order}, headers: {'Content-Type': 'application/json'}}).
    success(function(data, status, headers, config) {
      return data;
    }).
    error(function(data, status, headers, config) {
      console.log(data);
      return data;
    });
  };

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    setProducts: function(value) {
      products = Utils.arrayUnique(products.concat(value));
    },
    getProducts: function() {
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

      console.log(order.line_items);

      products.forEach(function(product){
        var id = product.id;
        if(product.selectedVariation) {
          id = product.selectedVariation.id;
        }
        lineitem = {"product_id": id, "quantity": product.qty}
        order.line_items.push(lineitem);
        console.log(lineitem);
      });

      order.shipping_address.first_name = deliveryInfo.first_name;
      order.shipping_address.address_1 = deliveryInfo.address_1;
      order.shipping_address.address_2 = deliveryInfo.address_2;
      order.shipping_address.city = deliveryInfo.city;
      order.shipping_address.state = deliveryInfo.state;
      order.shipping_address.postcode = deliveryInfo.postcode;
      order.shipping_address.country = deliveryInfo.country;
      order.shipping_address.email = deliveryInfo.email;
      order.shipping_address.postcode = deliveryInfo.post;

      order.billing_address = order.shipping_address;

      console.log(order);

      return postOrder(order);
    }
  }; 

  $rootScope.$on('resetSessionData', function () {
    clearProducts();
  });

});