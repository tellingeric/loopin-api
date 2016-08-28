var mongoose = require('mongoose');
var EventModel = require('../models/EventModel');
var EventDeliveryScheduleModel = require('../models/EventDeliveryScheduleModel');
var ProductModel = require('../models/ProductModel');

var Events = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',//''= asc, '-'=desc
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0,
            maxDistance = req.query.distance || 9999999999, //in km
            coords = [];

        coords[0] = req.query.longtitude ||0;
        coords[1] = req.query.latitude ||0;

        var now = new Date();

        if (order_by === 'loc') //note: only returns distinct events with nearest delivery addresses, but does not tell frontend which delivery address is the nearest. Keep the Event schema consistent.
        {
            maxDistance /=6371; //radius of Earth
            EventDeliveryScheduleModel.find({
                loc: {
                    $near: coords,
                    $maxDistance: maxDistance
                },
                active_from : {$lte: now},
                active_end : {$gte: now}
            }).
            limit(limit_doc).
            skip(skip_doc).
            exec(function(err, items) {
                if (err) {
                    return res.send(err);
                }

                var event_ids = items.map(function(item){
                    return item.event_id;
                });

                EventModel.find().where('_id').in(event_ids).populate('products.product_id').exec(function(err,items){
                    if (err) {
                        return res.send(err);
                    }

                    items.forEach(function(item){
                        item.products.forEach(function(product){
                            var filteredDetail = product.product_id.details.filter(function(detail){
                                return detail._id.equals(product.product_vid);
                                });
                            product.product_id.details = filteredDetail.shift();
                        });
                    });
                    res.json(items);

                });         
            });
        }
        else
        {

            EventModel.find()
            .populate('products.product_id')
            .limit(limit_doc)
            .skip(skip_doc)
            .sort(order + order_by)
            .exec(function (err, items) {

              items.forEach(function(item){
                item.products.forEach(function(product){
                  var filteredDetail = product.product_id.details.filter(function(detail){
                    return detail._id.equals(product.product_vid);
                  });
                  product.product_id.details = filteredDetail.shift();
                });
              });

              if (err) res.send(err);
              res.json(items);
            });
        }

    },

    getOne: function (req, res) {
        EventModel.findById(req.params.event_id)
        .populate({
          path: 'products.product_id'
        })
        .exec(function (err, item) {
          item.products.forEach(function(product){
          var filteredDetail = product.product_id.details.filter(function(detail){
            return detail._id.equals(product.product_vid);
          });
          product.product_id.details = filteredDetail.shift();
        });

        if (err) res.send(err);
        res.json(item);
      });
    },

    updateOne: function (req, res) {
        EventModel.findById(req.params.event_id, function (err, item) {
            if (err) res.send(err);

            for (prop in req.body) {
                item[prop] = req.body[prop];
            }

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "event updated"});
            });

        });
    },

    createOne: function (req, res) {
        var item = new EventModel(req.body);

        /*
        var rand_name = 'Event_' + Math.floor((Math.random() * 1000) + 1);

        var dummy_img = 'http://i.imgur.com/jHcilUJ.jpg';
        var dummy_user = 'dummy user id';

        var now = Date.now();
        //var time1 = new Date();
        var future = new Date();
        future.setDate(future.getDate()+365);



        //all fake data
        item.name = rand_name;
        item.description = 'lap dance';
        item.creator_user_id = dummy_user;
        item.eventDate = now;
        item.active_from = now;
        item.active_end = future;
        item.cancellable = true;
        item.img_url = dummy_img;
        item.delivery_schedule = [{
            location: 'LGA',
            arrival_time: Date.now()
        }, {
            location: 'JFK',
            arrival_time: Date.now()
        }];
        item.vendor_id = req.body.vendor_id;
        item.products = req.body.products;


        // testing data

        // item.products = [{
        //   product_id: mongoose.Types.ObjectId('578aa4487861d1d40fa674f1'),
        //   product_vid: mongoose.Types.ObjectId('578aa4487861d1d40fa674f2'),
        //   unit_price: 99.99,
        //   num_sold: 999
        // }];
        */

        item.save(function (err, saved) {
            if (err) res.send(err);

            var delivery = new EventDeliveryScheduleModel();
            delivery.event_id = saved._id;
            delivery.active_from = saved.active_from;
            delivery.active_end = saved.active_end;
            delivery.arrival_time = saved.arrival_time;
            delivery.loc = saved.loc;

            delivery.save(function(err) {
                if (err) res.send(err);
                res.json({message: "event created"});
            });
        });
    },

    createOneDelivery: function (req, res) {
        var delivery = new EventDeliveryScheduleModel(req.body);
        /*
        var now = Date.now();
        //var time1 = new Date();
        var future = new Date();
        future.setDate(future.getDate()+365);


        //test data


        delivery.event_id = mongoose.Types.ObjectId('578aa723466e37bc1415d497');
        delivery.active_from = now;
        delivery.active_end = future;
        delivery.arrival_time = future;

        //should move this function to utility
        var getRandomInRange = function(from, to, fixed) {
            return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
            // .toFixed() returns string, so ' * 1' is a trick to convert to number
        };
        delivery.loc = [getRandomInRange(-180,180,10),getRandomInRange(-90,90,10)];
*/
        delivery.save(function(err) {
            if (err) res.send(err);
            res.json({message: "delivery created"});
        });

        // testing data

        // item.products = [{
        //   product_id: mongoose.Types.ObjectId('578aa723466e37bc1415d497'),
        //   product_vid: mongoose.Types.ObjectId('578aa4487861d1d40fa674f2'),
        //   unit_price: 99.99,
        //   num_sold: 999
        // }];

    },

    deleteOne: function (req, res) {
        EventModel.remove({
            _id: req.params.event_id
        }, function (err, item) {
            if (err) res.send(err);
            res.json({message: "event deleted"})
        });
    },

    deleteAll: function(req,res) {
        EventModel.remove({}, function (err, item) {
            if (err) res.send(err);
            res.json({message: "all events deleted"})
        });
    }
};

module.exports = Events;
