angular.module('LoopIn-Web.event')

    .service('EventService', function ($localStorage, $http, domain, api, UtilityService) {

        /*var initLocalStorage = function () {
            if (!($localStorage.user)) {
                $localStorage = $localStorage.$default({
                    user: {}
                });
            }
        };*/



        /*
         name : {type: String,requried: true},
         description : String,
         created_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},  //should be an ObjectId, keep it simple for now
         eventDate : Date,
         active_from : Date,
         active_end : Date,
         cancellable : Boolean,
         img_url: String,
         delivery_schedule : [{
         location : String,
         arrival_time : Date
         }],
         vendor: {type: Schema.Types.ObjectId, ref: 'Vendor'},
         products : [{
         product_id : { type: Schema.Types.ObjectId, ref: 'Product' },
         product_vid : { type: Schema.Types.ObjectId, ref: 'Product.details'},
         unit_price : Number,
         num_sold: Number
         }]
         */

        return {
            getAll: function () {
                return $http(
                    {
                        url: domain + api.event_getAll,
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Event GET ALL');
                        // console.log(JSON.stringify(data));
                        _.forEach(data, function(value){
                          value.delivery_schedule = JSON.stringify(value.delivery_schedule);
                            value.products = JSON.stringify(value.products);
                        });
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Event GET ALL failed');
                        return data;
                    })
            },

            deleteOne: function (id) {
                return $http(
                    {
                        url: domain + api.event_remove + id,
                        method: 'DELETE',
                        headers: {'Content-Type': 'application/json'}
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Event DELETED ' + id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Event DELETE failed');
                        return data;
                    })
            },

            updateOne: function (item) {

                item.delivery_schedule = UtilityService.safelyParseJson(item.delivery_schedule);
                item.products = UtilityService.safelyParseJson(item.products);
                return $http(
                    {
                        url: domain + api.event_update + item._id,
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        data: item
                    }
                )
                    .success(function (data, status, headers, config) {
                        console.log('Event UPDATED ' + item._id);
                        return data;
                    })
                    .error(function (data, status, headers, config) {
                        console.log('Event UPDATE failed');
                        return data;
                    })
            }


        }

    });
