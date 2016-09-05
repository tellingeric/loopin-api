angular.module( 'LoopIn-Web', [
  'ngMaterial',
  'ngRoute',
  'ui.router',
    'ngStorage',
    'LoopIn-Web.user',
        'LoopIn-Web.dashboard'
 ])

 .run(function($rootScope){
       $rootScope.$on('$viewContentLoaded', function(event, next) {
           componentHandler.upgradeAllRegistered();
       });
   })


  // .config(($mdIconProvider, $mdThemingProvider) => {
    // Register the user `avatar` icons
    // $mdIconProvider
    //   .defaultIconSet("./assets/svg/avatars.svg", 128)
    //   .icon("menu", "./assets/svg/menu.svg", 24)
    //   .icon("share", "./assets/svg/share.svg", 24)
    //   .icon("google_plus", "./assets/svg/google_plus.svg", 24)
    //   .icon("hangouts", "./assets/svg/hangouts.svg", 24)
    //   .icon("twitter", "./assets/svg/twitter.svg", 24)
    //   .icon("phone", "./assets/svg/phone.svg", 24);

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('brown')
    //   .accentPalette('red');
  // })

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('dashboard.main', {
        url: '/dashboard/main',
        templateUrl: 'templates/dashboard/main.html'
      })

      .state('dashboard.user', {
        url: '/dashboard/user',
        templateUrl: 'templates/user/user.html'
      });



    $urlRouterProvider.otherwise('/dashboard');
    // $urlRouterProvider.otherwise('/login');

  })
  .config(function ($httpProvider){


  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', '$injector', function($q, $location, $localStorage, $injector) {

    console.log('interceptor');

      return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.user && $localStorage.user.token) {
                config.headers['x-access-token'] = $localStorage.user.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              console.log('redirect to login');
              // $location.path('/login');
              $injector.get('$state').transitionTo('login');

            }
            return $q.reject(response);
        }
      };
    }]);

  });
