var mongoose = require('mongoose');
var ProductModel = require('../models/ProductModel');
var _ = require('lodash');

var Products = {

    //createOne, getAll, getOne, deleteOne, updateOne
    createOne: function (req, res) {

        var product = new ProductModel();
        ProductModel.schema.eachPath(function(path) {
            if (_.has(req.body, path)){
                _.set(order, path, _.get(req.body, path));
            }
        });

        product.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Failed to create product:'});
            }
            res.status(201).json({ success: true, message: 'product created' });
        });
    },

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        ProductModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).exec(function (err, items) {
            if (err) res.send(err);
            res.json(items);
        });

    },

    getOne: function (req, res) {
        ProductModel.findById(req.params.product_id, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    },

    updateOne: function (req, res) {
        ProductModel.findById(req.params.product_id, function (err, item) {
            if (err) res.send(err);

            ProductModel.schema.eachPath(function(path) {
                if (_.has(req.body, path)){
                    _.set(item, path, _.get(req.body, path));
                }
            });

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "product updated"});
            });

        });
    },

    deleteOne: function (req, res) {
        ProductModel.remove({
            _id: req.params.product_id
        }, function (err, item) {
            if (err) res.send(err);
            res.json({message: "product deleted"})
        });
    },

    deleteAll: function(req,res) {
        ProductModel.remove({}, function (err, item) {
            if (err) res.send(err);
            res.json({message: "all products deleted"})
        });
    }

};

module.exports = Products;
