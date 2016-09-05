var mongoose = require('mongoose');
var ProductModel = require('../models/ProductModel');

var Products = {

    //createOne, getAll, getOne, deleteOne, updateOne
    createOne: function (req, res) {

        if(!req.body.name) {
          res.status(400).json({ success: false, message: 'Product name is required.' });  
        }
        if(!req.body.vendor) {
          res.status(400).json({ success: false, message: 'vendor is required.' });  
        }
        if(!req.body.created_by) {
          res.status(400).json({ success: false, message: 'created_by is required.' });  
        }

        var product = new ProductModel();
        product.name = req.body.name;
        product.vendor = mongoose.Types.ObjectId(req.body.vendor);
        product.created_by = mongoose.Types.ObjectId(req.body.created_by);
        product.details = req.body.details;

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

            for (prop in req.body) {
                item[prop] = req.body[prop];
            }

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
