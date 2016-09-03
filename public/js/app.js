angular.module( 'LoopIn-Web', [
  'ngMaterial',
  'ngRoute',
  'ui.router'
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
      .state('login', {
        url:'/login',
        templateUrl:'templates/auth/login.html'
      })

      .state('dashboard', {
        url:'/dashboard',
        templateUrl:'templates/dashboard.html'
      })

      .state('dashboard.main', {
        url: '/dashboard/main',
        templateUrl: 'templates/dashboard/main.html'
      })

      .state('dashboard.user', {
        url: '/dashboard/user',
        templateUrl: 'templates/user/user.html'
      })



    $urlRouterProvider.otherwise('/dashboard');
    // $urlRouterProvider.otherwise('/login');

  })
