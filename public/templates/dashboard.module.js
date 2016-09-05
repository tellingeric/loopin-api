angular.module('LoopIn-Web.dashboard', [
  'LoopIn-Web.constant',
  'ui.bootstrap'
])
  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        cache: false,
        templateUrl:'templates/dashboard.html',
        controller:'dashboardController'
      })

      .state('dashboard.main', {
        url: '/main',
        templateUrl: 'templates/dashboard/main.html'
      })

      .state('dashboard.user', {
        url: '/user',
        templateUrl: 'templates/user/user.html'
      });



    });
