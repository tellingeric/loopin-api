angular.module('LoopIn-Web.vendor', [
  'ngTable',
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.vendor', {
        url: '/vendor',
        templateUrl: 'templates/vendor/vendor.html',
        controller:'vendorController'
      });

  });
