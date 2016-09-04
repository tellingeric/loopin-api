angular.module('LoopIn-Web.user')

    .service('UserService', function( $localStorage, $http, domain, api) {
        $localStorage = $localStorage.$default({
            user: {}
        });

        return {
            login: function(email, pw){
                $localStorage.user.email = email;

                return $http.post(domain + api.login, {
                        email: email,
                        password: pw
                    })
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
