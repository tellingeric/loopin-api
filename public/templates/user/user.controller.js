angular.module('LoopIn-Web.user')
    .controller('userController', function ($scope, $state, $localStorage, UserService, NgTableParams) {

        $scope.user = {};
        $scope.users = [];
        $scope.originalData = angular.copy($scope.users);
        $scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.users});

        $scope.login = function () {
            console.log("TRY --> LOGIN user: " + $scope.user.username + " - PW: " + $scope.user.password);
            $scope.showing = false;

            UserService.login($scope.user.username, $scope.user.password).success(function (data) {
                    if (data.success){
                      $localStorage.user.token = data.token;
                      $localStorage.user.username = $scope.user.username;
                      $state.go('dashboard.main');
                      $scope.showing = true;
                    }
                })
                .error(function (data) {
                    $scope.showing = true;
                })


        };

        $scope.clearUserInfo = function () {
            $scope.user = {};
        };

        $scope.getAllUsers = function () {
            UserService.getAll().success(function (data) {
                $scope.users = data;
                $scope.tableParams.settings({dataset: $scope.users});
                $scope.originalData = angular.copy($scope.users);
            });

        };

        $scope.resetRow = function (row, rowForm) {
            row.isEditing = false;
            rowForm.$setPristine();
            //self.tableTracker.untrack(row);
            for ( var i in $scope.originalData){
                if($scope.originalData[i]._id === row._id){
                    return $scope.originalData[i]
                }
            }

        };

        $scope.save = function (row, rowForm) {
            //UserService.updateUser

            var originalRow = $scope.resetRow(row, rowForm);

            UserService.updateUser(row).success(function (data) {
                    angular.extend(originalRow, row);
                })
                .error(function (err) {
                    angular.extend(row, originalRow);
                    console.log(err);
                });

        };

        $scope.cancel = function (row, rowForm) {
            var originalRow = $scope.resetRow(row, rowForm);
            angular.extend(row, originalRow);
        };

        $scope.del = function (row) {
            UserService.deleteUser(row._id).success(function (data) {
                _.remove($scope.tableParams.settings().dataset, function (item) {
                    return row === item;
                });
                $scope.tableParams.reload().then(function (data) {
                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                        $scope.tableParams.page($scope.tableParams.page() - 1);
                        $scope.tableParams.reload();
                    }
                });
            })
        };


    });
