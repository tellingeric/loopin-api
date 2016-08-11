var OrderModel = require('../models/OrderModel');

var Orders = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'order_date',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        OrderModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).exec(function (err, items) {
            if (err) res.send(err);
            res.json(items);
        });

    },

    getOne: function (req, res) {
        OrderModel.findById(req.params.order_id, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    },

    updateOne: function (req, res) {
        OrderModel.findById(req.params.order_id, function (err, item) {
            if (err) res.send(err);

            for (prop in req.body) {
                item[prop] = req.body[prop];
            }

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "order updated"});
            });

        });
    },

    createOne: function (req, res) {
        var rand_name = 'Order_' + Math.floor((Math.random() * 1000) + 1);
        var dummy_user = 'dummy user id';

        var item = new OrderModel();
        //all fake data
        item.products = req.body.products;
        item.delivery_address = {
            street1: "street1",
            street2: "street2",
            city: "city",
            state: "State",
            zipCode: "11111",
            country: "US"
        };
        item.buyer_user_id = dummy_user;
        item.order_date = Date.now();
        item.event_id = req.body.event_id;

        item.save(function (err) {
            if (err) res.send(err);
            res.json({message: "order created"});
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
