angular.module('LoopIn-Web.main', [
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.main', {
        url: '/main',
        templateUrl: 'templates/dashboard/main.html',
        controller:'mainController'
      });

  });
