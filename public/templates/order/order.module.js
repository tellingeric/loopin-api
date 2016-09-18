angular.module('LoopIn-Web.order', [
  'ngTable',
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.order', {
        url: '/order',
        templateUrl: 'templates/order/order.html',
        controller:'orderController'
      });

  });
