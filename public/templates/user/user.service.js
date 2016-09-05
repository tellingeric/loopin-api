angular.module('LoopIn-Web.user')

    .service('UserService', function( $localStorage, $http, domain, api) {
        $localStorage = $localStorage.$default({
            user: {}
        });

        return {
            login: function(username, pw){
                $localStorage.user.username = username;

                return $http(
                    {
                        url: domain + api.login,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        data: {username: username, password: pw}
                    }
                    )
                    .success(function(data, status, headers, config){
                        console.log('USER log in Successfully');
                        // token saved to local storage in controller
                        return data;
                    })
                    .error(function(data, status, headers, config){
                        console.log('USER log in failed');
                        return data;
                    })

            },

            logout: function(){
                return '';
            }



        }

    });
