angular.module('LoopIn-Web.dashboard', [
  'LoopIn-Web.constant',
  'ui.bootstrap'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        abstract: true,
        templateUrl:'templates/dashboard.html',
        controller:'dashboardController'
      })

    });
