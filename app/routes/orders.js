var OrderModel = require('../models/OrderModel');
var _ = require('lodash');

var Orders = {
    //createOne, getAll, getOne, deleteOne, updateOne

    createOne: function (req, res) {

        var order = new OrderModel();

        OrderModel.schema.eachPath(function(path) {
            if (_.has(req.body, path)){
                _.set(order, path, _.get(req.body, path));
            }
        });

        order.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Failed to create order:'});
            }
            res.status(201).json({ success: true, message: 'order created' });
        });
    },

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'order_date',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        OrderModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).populate('products.product').lean().exec(function (err, items) {
            if (err) res.send(err);
            items.forEach(function(item){
                item.products.forEach(function(product){
                    var filteredDetail = product.product.details.filter(function(detail){
                        return detail._id.equals(product.p_vid);
                    });
                    product.product.details = filteredDetail.shift();
                });
            });
            res.json(items);
        });

    },

    getOpenOrders: function(req, res){

    },

    getByUser: function(req, res){
        var order_by = req.query.order_by || 'order_date',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        OrderModel.find({buyer: req.params.user_id}).limit(limit_doc).skip(skip_doc).sort(order + order_by).populate('products.product').lean().exec(function (err, items) {
            if (err) res.send(err);
            items.forEach(function(item){
                item.products.forEach(function(product){
                    var filteredDetail = product.product.details.filter(function(detail){
                        return detail._id.equals(product.p_vid);
                    });
                    product.product.details = filteredDetail.shift();
                });
            });
            res.json(items);
        });
    },

    getOne: function (req, res) {
        OrderModel.findById(req.params.order_id)
            .populate({
                path: 'products.product'
            })
            .lean()
            .exec(function (err, item) {
                item.products.forEach(function(product){
                    var filteredDetail = product.product.details.filter(function(detail){
                        return detail._id.equals(product.p_vid);
                    });
                    product.product.details = filteredDetail.shift();
                });

                if (err) res.send(err);
                res.json(item);
            });
    },

    updateOne: function (req, res) {
        OrderModel.findById(req.params.order_id, function (err, item) {
            if (err) res.send(err);

            OrderModel.schema.eachPath(function(path) {
                if (_.has(req.body, path)){
                    _.set(item, path, _.get(req.body, path));
                }
            });

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "order updated"});
            });

        });
    },

    deleteOne: function (req, res) {
        OrderModel.remove({
            _id: req.params.order_id
        }, function (err, item) {
            if (err) res.send(err);
            res.json({message: "order deleted"})
        });
    },

    deleteAll: function(req,res) {
        OrderModel.remove({}, function (err, item) {
            if (err) res.send(err);
            res.json({message: "all orders deleted"})
        });
    }
};

module.exports = Orders;
