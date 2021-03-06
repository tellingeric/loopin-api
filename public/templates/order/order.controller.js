angular.module('LoopIn-Web.order')
    .controller('orderController', function ($scope, $state, $localStorage, OrderService, NgTableParams, UtilityService) {

        $scope.orders = [];
        $scope.originalData = angular.copy($scope.orders);
        //$scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.orders});

        $scope.getAll = function () {
            OrderService.getAll().success(function (data) {
                $scope.orders = data;
                $scope.tableParams.settings({dataset: $scope.orders});
                $scope.originalData = angular.copy($scope.orders);
            });

        };

        $scope.resetRow = function (row, rowForm) {
            row.isEditing = false;
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
            OrderService.updateOne(row).success(function (data) {
                    row.products = JSON.stringify(row.products);
                    row.delivery_address = JSON.stringify(row.delivery_address);
                    angular.extend(originalRow, row);
                    UtilityService.showToast('success', row._id + ' saved!');

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

        $scope.del = function (row) {
            OrderService.deleteOne(row._id).success(function (data) {
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
