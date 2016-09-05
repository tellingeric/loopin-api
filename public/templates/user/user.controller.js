angular.module('LoopIn-Web.user')
  .controller('userController', function($scope, $state, $localStorage, UserService, NgTableParams ) {

    $scope.user = {};
    $scope.users = [];
    $scope.showing = true;
    $scope.tableParams = new NgTableParams({}, { dataset: $scope.users });

    $scope.login = function(){
      console.log("TRY --> LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
      $scope.showing = false;

      UserService.login($scope.user.username, $scope.user.password).success(function(data){
        $localStorage.user.token = data.token;
        $localStorage.user.username = $scope.user.username;
        $state.go('dashboard.main');
        $scope.showing = true;
      })
      .error(function(data){
        window.alert('Wrong credentials!');

        $scope.showing = true;
      })


    }

    $scope.clearUserInfo = function(){
      $scope.user = {};
    }

    $scope.getAllUsers = function(){
      UserService.getAll().success(function(data){
        $scope.users = data;
        $scope.tableParams.settings({ dataset: $scope.users });
      });

    }

  });
