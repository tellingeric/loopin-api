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

        var now = new Date();

        OrderModel.aggregate(
            [

                {$project: { _id: 0, products: 1 } },
                {$unwind: "$products" },
                {$group: { _id: "$products.event", numOrders: { $sum: 1 } }},
                { "$lookup": {
                    "from": "events",
                    "localField": "_id",
                    "foreignField": "_id",
                    "as": "event"
                }},
                {$unwind: "$event" },
                {$match: {"event.active_from" : {$lte: now}, "event.active_end" : {$gte: now}}},
                {$sort: { numOrders: -1 } },
                {"$limit": 10},
                {$project: { _id: 0, numOrders: 1, event: 1 } }

            ],
            function(err,results) {
                if (err) res.send(err);

                res.json(results);

            }
        )
    }

};


module.exports = Stats;