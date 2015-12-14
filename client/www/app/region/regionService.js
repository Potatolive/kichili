angular.module('region', ['utilities'])

.factory('regionService', function(Utils, $http, ApiEndpoint) {

  var pinCodes = [
    {value: '600083', place: 'Ashok Nagar'},
    {value: '600078', place: 'KK Nagar'},
    {value: '600033', place: 'West Mambalam'},
    {value: '600093', place: 'Saligramam'},
    {value: '600026', place: 'Vadapalani'}
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