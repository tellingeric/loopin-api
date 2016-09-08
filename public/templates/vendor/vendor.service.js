angular.module('LoopIn-Web.vendor')

    .service('VendorService', function ($localStorage, $http, domain, api) {

        /*var initLocalStorage = function () {
            if (!($localStorage.user)) {
                $localStorage = $localStorage.$default({
                    user: {}
                });
            }
        };*/


        return {
            getAll: function () {
                return $http(
                    {
                        url: domain + api.vendor_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Vendor GET ALL');
                        // console.log(JSON.stringify(data));
                        _.forEach(data, function(value){
                          value.address = JSON.stringify(value.address);
                        });
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Vendor GET ALL failed');
                        return data;
                    })
            },

            deleteOne: function (id) {
                return $http(
                    {
                        url: domain + api.vendor_remove + id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Vendor DELETED ' + id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Vendor DELETE failed');
                        return data;
                    })
            },

            updateOne: function (item) {
                return $http(
                    {
                        url: domain + api.vendor_update + item._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: item
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Vendor UPDATED ' + item._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Vendor UPDATE failed');
                        return data;
                    })
            }


        }

    });
