angular.module('LoopIn-Web.constant', [])

    .constant('domain', 'http://loopin-api.herokuapp.com/')
    // .constant('domain', 'http://localhost:3000/')


    .constant('api', {
        'login' : 'login',
        'register' : 'register',
        'events' : 'api/events',
        'me':'api/me',
        'user_getAll': 'api/users',
        'user_remove': 'api/users/'

    });
