angular.module('LoopIn-Web.event', [
  'ngTable',
  'LoopIn-Web.constant',
    'LoopIn-Web.utility'

])


  .config(function($stateProvider) {
    $stateProvider
      .state('dashboard.event', {
        url: '/event',
        templateUrl: 'templates/event/event.html',
        controller:'eventController'
      });

  });
