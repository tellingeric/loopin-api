var VendorModel = require('../models/VendorModel');

var Vendors = {
    //createOne, getAll, getOne, deleteOne, updateOne

    createOne: function (req, res) {

        var vendor = new VendorModel();
        vendor.name = req.body.name;
        vendor.address = req.body.address;
        vendor.loc = req.body.loc;
        vendor.email = req.body.email;
        vendor.phone = req.body.phone;
        vendor.type = req.body.type;

        vendor.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Failed to create vendor:'});
            }
            res.status(201).json({ success: true, message: 'vendor created' });
        });
    },

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0,
            maxDistance = req.query.distance || 9999999999, //in km
            coords = [];

        coords[0] = req.query.longtitude ||0;
        coords[1] = req.query.latitude ||0;

        if (order_by === 'loc')
        {
            maxDistance /=6371; //radius of Earth
            VendorModel.find({
                loc: {
                    $near: coords,
                    $maxDistance: maxDistance
                }
            }).limit(limit_doc).skip(skip_doc).exec(function(err, items) {
                if (err) {
                    return res.send(err);
                }

                res.json(items);
            });
        }
        else
        {
            VendorModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).exec(function (err, items) {
                if (err) res.send(err);
                res.json(items);
            });
        }
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

            for (prop in req.body) {
                item[prop] = req.body[prop];
            }

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "vendor updated"});
            });

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
