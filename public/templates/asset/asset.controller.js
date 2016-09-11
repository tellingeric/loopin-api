angular.module('LoopIn-Web.asset')
    .controller('assetController', function ($scope, $state, $localStorage, AssetService, NgTableParams, UtilityService) {

        //$scope.user = {};
        $scope.assets = [];
        $scope.originalData = angular.copy($scope.assets);
        //$scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.assets});

        $scope.getAll = function () {
            AssetService.getAll().success(function (data) {
                $scope.assets = data;
                $scope.assets.forEach(function(entry){
                    entry.rel_url = entry.path.replace('public/','');
                });
                $scope.tableParams.settings({dataset: $scope.assets});
                $scope.originalData = angular.copy($scope.assets);
            });

        };

        $scope.resetRow = function (row, rowForm) {
            row.isEditing = false;
            rowForm.$setPristine();
            for ( var i in $scope.originalData){
                if($scope.originalData[i]._id === row._id){
                    return $scope.originalData[i];
                }
            }

        };

        $scope.save = function (row, rowForm) {
            //UserService.updateUser

            var originalRow = $scope.resetRow(row, rowForm);
            AssetService.updateOne(row).success(function (data) {
                    row.address = JSON.stringify(row.address);
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
            AssetService.deleteOne(row._id).success(function (data) {
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
