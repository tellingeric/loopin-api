angular.module('LoopIn-Web.event')
    .controller('eventController', function ($scope, $state, $localStorage, EventService, NgTableParams, UtilityService) {

        //$scope.user = {};
        $scope.events = [];
        $scope.selectedRow = {};
        $scope.originalData = angular.copy($scope.events);
        //$scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.events});

        $scope.getAll = function () {
            EventService.getAll().success(function (data) {
                $scope.events = data;
                $scope.tableParams.settings({dataset: $scope.events});
                $scope.originalData = angular.copy($scope.events);
            });

        };

        $scope.resetRow = function (row, rowForm) {
            row.isEditing = false;
            $scope.selectedRow = {};
            rowForm.$setPristine();
            //self.tableTracker.untrack(row);
            for ( var i in $scope.originalData){
                if($scope.originalData[i]._id === row._id){
                    return $scope.originalData[i];
                }
            }

        };

        $scope.save = function (row, rowForm) {
            //UserService.updateUser

            var originalRow = $scope.resetRow(row, rowForm);
            EventService.updateOne(row).success(function (data) {
                    angular.extend(originalRow, row);
                    UtilityService.showToast('success', row._id + ' saved!')

                })
                .error(function (err) {
                    angular.extend(row, originalRow);
                    UtilityService.showToast('warning', row._id + ' failed! err');

                    console.log(err);
                });

        };

        $scope.cancel = function (row, rowForm) {
            var originalRow = $scope.resetRow(row, rowForm);
            angular.extend(row, originalRow);
        };

        $scope.edit = function(row){
          row.isEditing = true;
          $scope.selectedRow = row;
        }

        $scope.del = function (row) {
            EventService.deleteOne(row._id).success(function (data) {
                _.remove($scope.tableParams.settings().dataset, function (item) {
                    return row === item;
                });
                $scope.tableParams.reload().then(function (data) {
                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                        $scope.tableParams.page($scope.tableParams.page() - 1);
                        $scope.tableParams.reload();
                    }
                });

                UtilityService.showToast('danger', row._id + ' deleted!')

            })
        };


    });
