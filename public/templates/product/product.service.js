angular.module('LoopIn-Web.product')

    .service('ProductService', function ($localStorage, $http, domain, api, UtilityService) {

        return {
            getAll: function () {
                return $http(
                    {
                        url: domain + api.product_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Product GET ALL');
                        // console.log(JSON.stringify(data));
                        _.forEach(data, function(value){
                            value.rel_url = (value.details && value.details[0].img_path)?value.details[0].img_path.replace('public/',''):'';
                          value.details = JSON.stringify(value.details);
                        });
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Product GET ALL failed');
                        return data;
                    })
            },


            deleteOne: function (id) {
                return $http(
                    {
                        url: domain + api.product_remove + id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Product DELETED ' + id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Product DELETE failed');
                        return data;
                    })
            },

            updateOne: function (item) {

                item.details = UtilityService.safelyParseJson(item.details);

                return $http(
                    {
                        url: domain + api.product_update + item._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: item
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Product UPDATED ' + item._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Product UPDATE failed');
                        return data;
                    })
            }


        }

    });
