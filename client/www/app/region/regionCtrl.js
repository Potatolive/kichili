angular.module('region')

.controller('regionCtrl', function($scope, $state, regionService) {
	$scope.pinCodes = regionService.getPinCodes();

	$scope.go = function ( pincode ) {
		regionService.setPinCode(pincode);
		console.log(regionService.getPinCode());
    	$state.go('app.categories');
  	};
});