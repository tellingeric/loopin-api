angular.module( 'LoopIn-Web', [
  'ngMaterial',
  'ui.router'
 ])

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

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl:'templates/user/login.html'
      })




    $urlRouterProvider.otherwise('/login');
    // $urlRouterProvider.otherwise('/login');

  })
