angular.module('LoopIn-Web.constant', [])

    .constant('domain', 'http://loopin-api.herokuapp.com/')
    //.constant('domain', 'http://localhost:3000/')


    .constant('api', {
        'login' : 'login',
        'register' : 'register',
        'events' : 'api/events',
        'me':'api/me',
        'user_getAll': 'api/users',
        'user_remove': 'api/users/',
        'user_update': 'api/users/',
        'product_getAll': 'api/products',
        'product_remove': 'api/products/',
        'product_update': 'api/products/',
        'order_getAll': 'api/orders',
        'order_remove': 'api/orders/',
        'order_update': 'api/orders/',
        'vendor_getAll': 'api/vendors',
        'vendor_remove': 'api/vendors/',
        'vendor_update': 'api/vendors/',
        'event_getAll': 'api/events',
        'event_remove': 'api/events/',
        'event_update': 'api/events/',
        'asset_getAll': 'api/assets',
        'asset_remove': 'api/assets/',
        'asset_update': 'api/assets/',
        'stats_getStats': 'api/stats',
        'upload': 'api/upload'


    })

    .constant('uiSettings', {
        'toastDelay': 500
    });
