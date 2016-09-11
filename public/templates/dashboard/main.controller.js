angular.module('LoopIn-Web.main')
    .controller('mainController', function ($scope, $state, $localStorage, UtilityService, MainService) {

        //$scope.user = {};
        $scope.stats = {};

        $scope.getStats = function () {
            MainService.getStats().success(function (data) {
                $scope.stats = data;
            });

        };




    });
