var VendorModel = require('../models/VendorModel');

var Vendors = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

        VendorModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).exec(function (err, items) {
            if (err) res.send(err);
            res.json(items);
        });

    },

    getOne: function (req, res) {
        VendorModel.findById(req.params.vendor_id, function (err, item) {
            if (err) res.send(err);
            res.json(item);
        });
    },

    updateOne: function (req, res) {
        VendorModel.findById(req.params.vendor_id, function (err, item) {
            if (err) res.send(err);
            item.name = item.name + '_Updated';

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "vendor updated"});
            });

        });
    },

    createOne: function (req, res) {
        var rand_name = 'Vendor_' + Math.floor((Math.random() * 1000) + 1);

        //should move this function to utility
        var getRandomInRange = function(from, to, fixed) {
            return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
            // .toFixed() returns string, so ' * 1' is a trick to convert to number
        };

        var item = new VendorModel();
        item.name = rand_name;

        item.address = {
            street1: "street1",
            street2: "street2",
            city: "city",
            state: "State",
            zipCode: "11111",
            country: "US"
        };
        item.email = "test@gmail.com";
        item.phone = "6316128465";
        item.type = "RESTAURANTS";

        item.loc = [getRandomInRange(-180,180,10),getRandomInRange(-90,90,10)];

        item.save(function (err) {
            if (err) res.send(err);
            res.json({message: "vendor created"});
        });

    },

    deleteOne: function (req, res) {
        VendorModel.remove({
            _id: req.params.vendor_id
        }, function (err, item) {
            if (err) res.send(err);
            res.json({message: "vendor deleted"})
        });
    },

    deleteAll: function(req,res) {
        VendorModel.remove({}, function (err, item) {
            if (err) res.send(err);
            res.json({message: "all vendors deleted"})
        });
    }

};

module.exports = Vendors;
