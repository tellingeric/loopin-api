angular.module('LoopIn-Web.dashboard', [
        'LoopIn-Web.constant'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url:'/dashboard',
                cache: false,
                templateUrl:'templates/dashboard.html',
                controller:'dashboardController'
            })


    });
