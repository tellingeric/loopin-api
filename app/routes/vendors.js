var VendorModel = require('../models/VendorModel');
var Functions = require('../utilities/functions');
var _ = require('lodash');

var Vendors = {
    //createOne, getAll, getOne, deleteOne, updateOne

    createOne: function (req, res) {

        var vendor = new VendorModel();
        VendorModel.schema.eachPath(function(path) {
            if (_.has(req.body, path)){
                _.set(order, path, _.get(req.body, path));
            }
        });

        vendor.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, message: 'Failed to create vendor:'});
            }
            res.status(201).json({ success: true, message: 'vendor created' });
        });
    },

    // generate junk testing data
    random: function(req, res){
      var i = 0;
      for (i=0; i<=100; i++){
        var temp = new VendorModel();
        temp.name = "vendor" + Functions.getRandomInRange(0, 1000, 0);
        temp.address.street1 = "street1 - " + Functions.getRandomInRange(0, 1000, 0);
        temp.address.street2 = "street2" + Functions.getRandomInRange(0, 1000, 0);
        temp.address.city = "Queens";
        temp.address.state = "AZ";
        temp.address.zipCode = "11111";
        temp.loc = [Functions.getRandomInRange(-50, 50, 0), Functions.getRandomInRange(-50, 50, 0)]

        temp.email = "sb" + Functions.getRandomInRange(0, 1000, 0) + "@sb.com";
        temp.phone = "111111111"; //Functions.getRandomInRange(500000, 99999999, 0).toString()
        temp.type = "restaurant";


        temp.save(function(err){
          if (err){
            console.log(err);
          }
          else {
            console.log('success' + i);
          }
        });

      }
      res.json({success: true});

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
            }).limit(limit_doc).skip(skip_doc).populate('events').exec(function(err, items) {
                if (err) {
                    return res.send(err);
                }

                res.json(items);
            });
        }
        else
        {
            VendorModel.find().limit(limit_doc).skip(skip_doc).sort(order + order_by).populate('events').exec(function (err, items) {
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

            VendorModel.schema.eachPath(function(path) {
                //console.log(path);

                if (_.has(req.body, path)){
                  _.set(item, path, _.get(req.body, path));
                }
                //if(req.body[path]) {item[path] = req.body[path];}
            });

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
