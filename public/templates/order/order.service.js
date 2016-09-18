angular.module('LoopIn-Web.order')

    .service('OrderService', function ($localStorage, $http, domain, api, UtilityService) {

        return {
            getAll: function () {
                return $http(
                    {
                        url: domain + api.order_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Order GET ALL');
                        // console.log(JSON.stringify(data));
                        _.forEach(data, function (value) {
                            value.products = JSON.stringify(value.products);
                            value.delivery_address = JSON.stringify(value.delivery_address);
                        });
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Order GET ALL failed');
                        return data;
                    })
            },


            deleteOne: function (id) {
                return $http(
                    {
                        url: domain + api.order_remove + id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Order DELETED ' + id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Order DELETE failed');
                        return data;
                    })
            },

            updateOne: function (item) {

                item.products = UtilityService.safelyParseJson(item.products);
                item.delivery_address = UtilityService.safelyParseJson(item.delivery_address);

                return $http(
                    {
                        url: domain + api.order_update + item._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: item
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Order UPDATED ' + item._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Order UPDATE failed');
                        return data;
                    })
            }


        }

    });
