angular.module('LoopIn-Web.user')

    .service('UserService', function ($localStorage, $http, domain, api) {

        var initLocalStorage = function () {
            if (!($localStorage.user)) {
                $localStorage = $localStorage.$default({
                    user: {}
                });
            }
        };


        return {
            login: function (username, pw) {
                //$localStorage.user.username = username;
                initLocalStorage();

                return $http(
                    {
                        url: domain + api.login,
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        data: {username: username, password: pw}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('USER log in Successfully');
                        // token saved to local storage in controller
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('USER log in failed');
                        return data;
                    })

            },

            logout: function () {
                return '';
            },


            getAll: function () {
                return $http(
                    {
                        url: domain + api.user_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('USER GET ALL');
                        // console.log(JSON.stringify(data));
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('USER GET ALL failed');
                        return data;
                    })
            },

            deleteUser: function (user_id) {
                return $http(
                    {
                        url: domain + api.user_remove + user_id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('USER DELETED ' + user_id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('USER DELETE failed');
                        return data;
                    })
            },

            updateUser: function (user) {
                return $http(
                    {
                        url: domain + api.user_update + user._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: user
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('USER UPDATED ' + user._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('USER UPDATE failed');
                        return data;
                    })
            }


        }

    });
