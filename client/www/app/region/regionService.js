angular.module('region', ['utilities'])

.factory('regionService', function(Utils, $http, ApiEndpoint) {

  var pinCodes = [
    {value: '600083', place: 'Ashok Nagar'},
    {value: '600084'},
    {value: '600085'},
    {value: '600086'},
    {value: '600087'},
    {value: '600088'},
  ];

  var region = {
    pinCode: null
  };

  // Might use a resource here that returns a JSON array
  // Some fake testing data
  return {
    getPinCodes: function() {
      return pinCodes;
    },
    setPinCode: function(value) {
      region.pinCode = value;
    },
    getPinCode: function() {
      return region.pinCode;
    }
  }; 
});