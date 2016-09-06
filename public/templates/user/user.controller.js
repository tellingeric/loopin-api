angular.module('LoopIn-Web.user')
  .controller('userController', function($scope, $state, $localStorage, UserService, NgTableParams ) {

    $scope.user = {};
    $scope.users = [];
    $scope.originalData = angular.copy($scope.users);
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
        $scope.originalData = angular.copy($scope.users);
      });

    }

    $scope.cancel = function (row, rowForm) {
      var originalRow = $scope.resetRow(row, rowForm);
      angular.extend(row, originalRow);
    }

    $scope.del = function (row) {
      UserService.deleteUser(row._id).success(function(data){
        _.remove($scope.tableParams.settings().dataset, function(item) {
          return row === item;
        });
        $scope.tableParams.reload().then(function(data) {
          if (data.length === 0 && $scope.tableParams.total() > 0) {
            $scope.tableParams.page($scope.tableParams.page() - 1);
            $scope.tableParams.reload();
          }
        });
      })
    }

    $scope.resetRow = function (row, rowForm){
      row.isEditing = false;
      rowForm.$setPristine();
      $scope.tableTracker.untrack(row);
      return _.findWhere($scope.originalData, function(r){
        return r.id === row.id;
      });

    }

    $scope.save = function (row, rowForm) {
      var originalRow = $scope.resetRow(row, rowForm);
      angular.extend(originalRow, row);
    }



  });
