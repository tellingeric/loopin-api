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

    }

};


module.exports = Stats;