angular.module('LoopIn-Web.product', [
  'ngTable',
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.product', {
        url: '/product',
        templateUrl: 'templates/product/product.html',
        controller:'productController'
      });

  });
