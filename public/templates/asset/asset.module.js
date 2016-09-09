angular.module('LoopIn-Web.asset', [
  'ngTable',
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.asset', {
        url: '/asset',
        templateUrl: 'templates/asset/asset.html',
        controller:'assetController'
      });

  });
