angular.module('LoopIn-Web.dashboard')
    .controller('dashboardController', function($scope, $state, $localStorage, $http, domain, api) {

        $scope.user = {};
        $scope.showing = true;

        $scope.getUser = function(){
            var token = ($localStorage.user)? ($localStorage.user.token || ''):'';

            $http(
                {
                    url: domain + api.me,
                    method: 'GET',
                    headers: { 'x-access-token': token }
                }
            )
                .success(function(data, status, headers, config){
                    console.log('USER log in Successfully');
                    // token saved to local storage in controller
                    $scope.user=data;
                    return data;
                })
                .error(function(data, status, headers, config){
                    console.log('USER log in failed');
                    return data;
                });
        };

        $scope.logOut = function(){
            $localStorage.user.token = '';
            $state.go('login');
        };

    });
