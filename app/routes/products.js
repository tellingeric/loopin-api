var mongoose = require('mongoose');
var ProductModel = require('../models/ProductModel');

var Products = {
    getAll: function(req, res){
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        ProductModel.find().
        limit(limit_doc).
        skip(skip_doc).
        sort(order+order_by).
        exec(function (err, items) {
            if (err) res.send(err);
            res.json(items);
        });

    }
    ,
    create: function(req, res){
        var rand_name = 'Product_' + Math.floor((Math.random() * 1000) + 1);
        var product = new ProductModel();

        product.name = rand_name;
        product.vendor_id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');


    },

    remove: function(req, res){
        ProductModel.remove({
            _id: req.params.product_id
        }, function (err, product){
            if (err) res.send(err);
            res.json({message: "product deleted"})
        });
    }

};

module.exports = Products;
