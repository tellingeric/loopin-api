angular.module('LoopIn-Web.vendor')
    .controller('vendorController', function ($scope, $state, $localStorage, $timeout, VendorService, NgTableParams, ngToast) {

        //$scope.user = {};
        $scope.vendors = [];
        $scope.originalData = angular.copy($scope.vendors);
        //$scope.showing = true;
        $scope.tableParams = new NgTableParams({}, {dataset: $scope.vendors});

        $scope.showToast = function(type, msg){
          $timeout(function() {
            ngToast.create({
              className: type,
              content: msg,
              dismissOnTimeout: true,
              dismissButton: true,
              dismissOnClick: true
            });
          }, 500);
        }

        $scope.getAll = function () {
            VendorService.getAll().success(function (data) {
                $scope.vendors = data;
                $scope.tableParams.settings({dataset: $scope.vendors});
                $scope.originalData = angular.copy($scope.vendors);
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
            VendorService.updateOne(row).success(function (data) {
                    angular.extend(originalRow, row);
                    $scope.showToast('success', row._id + ' saved!')

                })
                .error(function (err) {
                    angular.extend(row, originalRow);
                    $scope.showToast('warning', row._id + ' failed! err')

                    console.log(err);
                });

        };

        $scope.cancel = function (row, rowForm) {
            var originalRow = $scope.resetRow(row, rowForm);
            angular.extend(row, originalRow);
        };

        $scope.del = function (row) {
            VendorService.deleteOne(row._id).success(function (data) {
                _.remove($scope.tableParams.settings().dataset, function (item) {
                    return row === item;
                });
                $scope.tableParams.reload().then(function (data) {
                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                        $scope.tableParams.page($scope.tableParams.page() - 1);
                        $scope.tableParams.reload();
                    }
                });

                $scope.showToast('danger', row._id + ' deleted!')

            })
        };


    });
