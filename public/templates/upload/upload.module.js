angular.module('LoopIn-Web.upload', [
        'LoopIn-Web.constant',
        'LoopIn-Web.utility',
        'angularFileUpload'

    ])


    .config(function($stateProvider) {
        $stateProvider
            .state('dashboard.upload', {
                url: '/upload',
                templateUrl: 'templates/upload/upload.html',
                controller:'uploadController'
            });

    });
