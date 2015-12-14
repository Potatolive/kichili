angular.module('orderTracking')

.controller('orderTrackingCtrl',
  function($scope, $ionicModal, 
    $ionicLoading, 
    $timeout, $state, 
    $rootScope, orderTrackingService, 
    cartService, Utils) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  var init = function() {
    
  };

  $scope.$on('$ionicView.enter', function(e) {
      console.log(cartService.deliveryInfo);
      
      $ionicLoading.show({
        template: 'Loading...'
      });

      orders = orderTrackingService.getOrders();

      orders = orders.sort(function(a, b){
        var keyA = Number(a.id),
        keyB = Number(b.id);
        return keyB - keyA;
      });

      var ordersToDisplay = orders;

      console.log('Orders:');
      orders.forEach(function(order) {
        if(order.status != 'completed') {
          var orderService = orderTrackingService.getOrderStatus(order.id);
          orderService.then(function(success) {
            //Utils.arrayUnique(orders.concat(success.data.order));
            if(order.id === success.data.order.id) {
              order.status = success.data.order.status;
            }
          });
        }
        else {
          ordersToDisplay.push(order);
        }
      });

      console.log(ordersToDisplay);

      $scope.orders = ordersToDisplay;

      $ionicLoading.hide();
  });

});