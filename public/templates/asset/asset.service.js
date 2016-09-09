angular.module('LoopIn-Web.asset')

    .service('AssetService', function ($localStorage, $http, domain, api, UtilityService) {

        return {
            getAll: function () {
                return $http(
                    {
                        url: domain + api.asset_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Asset GET ALL');
                        // console.log(JSON.stringify(data));
                        _.forEach(data, function(value){
                          value.address = JSON.stringify(value.address);
                        });
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Asset GET ALL failed');
                        return data;
                    })
            },

            deleteOne: function (id) {
                return $http(
                    {
                        url: domain + api.asset_remove + id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Asset DELETED ' + id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Asset DELETE failed');
                        return data;
                    })
            },

            updateOne: function (item) {

                item.address = UtilityService.safelyParseJson(item.address);

                return $http(
                    {
                        url: domain + api.asset_update + item._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: item
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Asset UPDATED ' + item._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Asset UPDATE failed');
                        return data;
                    })
            }


        }

    });
