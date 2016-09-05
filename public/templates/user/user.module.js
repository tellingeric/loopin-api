angular.module('LoopIn-Web.user', [
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


    });