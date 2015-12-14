angular.module('region')

.controller('regionCtrl', function($scope, $ionicModal, $ionicLoading, $timeout, $state, regionService) {
	$scope.pinCodes = regionService.getPinCodes();

	$scope.go = function ( pincode ) {
		regionService.setPinCode(pincode);
		console.log(regionService.getPinCode());
    	$state.go('app.categories');
  	};

  	$scope.$on('$locationChangeStart', function(event) {
  	  $scope.error = null;
      if (!!!regionService.getPinCode()) {
      	$scope.error = {"message": "Please select a location before proceeding!"};
      	event.preventDefault();
      }
	});
});