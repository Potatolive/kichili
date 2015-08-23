angular.module('starter.services', [])

.factory('Products', function() {

  var products = [
    {
      id: 1,
      name: "Boiled Rice - Ponni",
      imgUrl: "",
      company: "BP Royal",
      categoryId: 1,
      availableQty: [
        {name: "5 kg - bag"},
        {name: "10 kg - bag", default: true},
        {name: "15 kg - bag"},
      ],
      price: "595",
      currency: "INR",
      sellingPrice: "542.9",
      qty: 1
    },
    {
      id: 2,
      name: "Moong Dal",
      imgUrl: "",
      company: "BP Royal",
      categoryId: 1,
      availableQty: [
        {name: "5 kg - bag"},
        {name: "10 kg - bag", default: true},
        {name: "15 kg - bag"},
      ],
      price: "695",
      currency: "INR",
      sellingPrice: "442.9"
    },
  ];

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    all: function() {
      return products;
    }
  };
})

.factory('Categories', function() {

  var categories = [
    {id: 1, name: "Grocery"},
    {id: 2, name: "Fruits"},
    {id: 3, name: "Vegetables"},
    {id: 4, name: "Snack & Bakery"},
    {id: 5, name: "Stations & Gifts"},
    {id: 6, name: "Cosmetics"},
    {id: 7, name: "Beverages"},
    {id: 8, name: "Plastic & Utensils"}
  ];

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    all: function(categoryId) {
      return categories;
    }
  };
});