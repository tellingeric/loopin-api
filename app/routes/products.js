var ProductModel = require('../models/ProductModel');

var Products = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
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
            item.name = item.name + '_Updated';

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "product updated"});
            });

        });
    },

    createOne: function (req, res) {
        var rand_name = 'Product_' + Math.floor((Math.random() * 1000) + 1);

        var item = new ProductModel();
        //all fake data
        item.name = rand_name;
        item.vendor_id =  '577feda0c0d56fab4dbc586e';
        item.creator_user_id = '577feda0c0d56fab4dbc586e';
        item.details = [{
            vid: '577feda0c0d56fab4dbc586e',
            description: 'Delicious Poop',
            price: 9.97,
            creator_user_id: '577feda0c0d56fab4dbc586e',
            create_at: Date.now(),
            img_url: 'http://localhost:3000/somthing.png',
            options: [{option_name: 'Hot level', option_value: 'Mild'},{option_name: 'Hot level', option_value: 'Hot'},{option_name: 'Hot level', option_value: 'Inferno'}]
        },
        {
            vid: '577feda0c0d56fab4dbc586e',
            description: 'Tasty Pee',
            price: 5.97,
            creator_user_id: '577feda0c0d56fab4dbc586e',
            create_at: Date.now(),
            img_url: 'http://localhost:3000/somthing.png',
            options: [{option_name: 'Hot level', option_value: 'Mild'},{option_name: 'Hot level', option_value: 'Hot'},{option_name: 'Hot level', option_value: 'Inferno'}]
        }];

        item.save(function (err) {
            if (err) res.send(err);
            res.json({message: "product created"});
        });

    },

    deleteOne: function (req, res) {
        ProductModel.remove({
            _id: req.params.product_id
        }, function (err, item) {
            if (err) res.send(err);
            res.json({message: "product deleted"})
        });
    }

};

module.exports = Products;
