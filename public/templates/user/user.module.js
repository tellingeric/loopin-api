angular.module('LoopIn-Web.user', [
  'ngTable',
  'LoopIn-Web.constant'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url:'/login',
        cache: false,
        templateUrl:'templates/user/login.html',
        controller:'userController'
      })

      .state('dashboard.user', {
        url: '/user',
        templateUrl: 'templates/user/user.html',
        controller:'userController'
      });

  })
