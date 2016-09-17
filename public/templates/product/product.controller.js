angular.module('LoopIn-Web.product')
    .controller('productController', function ($scope, $state, $localStorage, ProductService, NgTableParams, UtilityService) {

        $scope.products = [];
        $scope.originalData = angular.copy($scope.products);
        //$scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.products});

        $scope.getAll = function () {
            ProductService.getAll().success(function (data) {
                $scope.products = data;
                $scope.tableParams.settings({dataset: $scope.products});
                $scope.originalData = angular.copy($scope.products);
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
            ProductService.updateOne(row).success(function (data) {
                    row.details = JSON.stringify(row.details);
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
            ProductService.deleteOne(row._id).success(function (data) {
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
