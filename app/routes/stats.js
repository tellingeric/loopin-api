var UserModel = require('../models/UserModel');
var VendorModel = require('../models/VendorModel');
var ProductModel = require('../models/ProductModel');
var EventModel = require('../models/EventModel');
var OrderModel = require('../models/OrderModel');
var AssetModel = require('../models/AssetModel');
var _ = require('lodash');

var Stats = {

    getStats: function(req, res) {

        var stats = {};
        UserModel.count({}).exec()
            .then(function(num){
                stats.numOfUsers = num;
                return VendorModel.count({}).exec();
            })
            .then(function(num){
                stats.numOfVendors = num;
                return ProductModel.count({}).exec();
            })
            .then(function(num){
                stats.numOfProducts = num;
                return EventModel.count({}).exec();
            })
            .then(function(num){
                stats.numOfEvents = num;
                return OrderModel.count({}).exec();
            })
            .then(function(num){
                stats.numOfOrders = num;
                return AssetModel.count({}).exec();
            })
            .then(function(num){
                stats.numOfAssets = num;
                res.json(stats);
            })

    },

    getTopEvents: function(req, res) {
        OrderModel.aggregate(
            [

                {$project: { _id: 0, products: 1 } },
                {$unwind: "$products" },
                //{$project: { _id: 0, "products.event": 1 } },

                /*{ "$lookup": {
                    "from": "Event",
                    "localField": "products.event",
                    "foreignField": "_id",
                    "as": "products.eventObj"
                }}
                */
                {$group: { _id: "$products.event", numOrders: { $sum: 1 } }},
                {$sort: { numOrders: -1 } },
                {"$limit": 10}

                /*
                ,
                { "$lookup": {
                    "from": "Events",
                    "localField": "_id",
                    "foreignField": "_id",
                    "as": "event"
                }}*/
            ],
            function(err,results) {
                if (err) res.send(err);
                //var ids = _.map(results, function(item){ return item._id;});

                EventModel.find(
                    { _id : {
                        $in: results.map(function(o){ return o._id; })
                    }}
                ).exec(function(err,items){
                    if (err) res.send(err);
                    res.json(items);
                });

                //res.json(results);




            }
        )
    }

};


module.exports = Stats;