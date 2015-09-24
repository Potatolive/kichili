angular.module('starter.services')

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