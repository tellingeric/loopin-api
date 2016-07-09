var OrderModel = require('../models/OrderModel');

var Orders = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'order_date',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        OrderModel.find().
        limit(limit_doc).
        skip(skip_doc).
        sort(order+order_by).
        exec(function (err, items) {
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
            item.order_date = Date.now();

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "order updated"});
            });

        });
    },

    createOne: function (req, res) {
        var rand_name = 'Order_' + Math.floor((Math.random() * 1000) + 1);

        var item = new OrderModel();
        //all fake data


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
    }
};

module.exports = Orders;
