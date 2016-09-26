var mongoose = require('mongoose');
var EventModel = require('../models/EventModel');
var EventDeliveryScheduleModel = require('../models/EventDeliveryScheduleModel');
var ProductModel = require('../models/ProductModel');
var _ = require('lodash');

var Events = {
    //createOne, getAll, getOne, deleteOne, updateOne

    createOne: function (req, res) {

        var event = new EventModel();
        event.name = req.body.name;
        event.description = req.body.description;
        event.eventDate = req.body.eventDate;
        event.active_from = req.body.active_from;
        event.active_end = req.body.active_end;
        event.cancellable = req.body.cancellable;
        event.imgur = req.body.imgur;
        event.delivery_schedule = req.body.delivery_schedule;
        event.vendor = mongoose.Types.ObjectId(req.body.vendor);
        event.created_by = mongoose.Types.ObjectId(req.body.created_by);
        event.products = req.body.products;
        event.save(function (err, saved) {
            if (err) res.send(err);

            var delivery = new EventDeliveryScheduleModel();
            delivery.event_id = saved._id;
            delivery.active_from = saved.active_from;
            delivery.active_end = saved.active_end;
            delivery.arrival_time = saved.arrival_time;
            delivery.loc = saved.loc;

            delivery.save(function(err) {
                if (err)
                {
                    console.log(err);
                    return res.status(400).json({ success: false, message: 'Failed to delivery event:'});
                }
                res.status(201).json({ success: true, message: 'Event created' });
            });
        });
    },

    createOneDelivery: function (req, res) {
        var delivery = new EventDeliveryScheduleModel(req.body);
        delivery.save(function(err) {
            if (err) 
            {
                return res.status(400).json({ success: false, message: 'Failed to delivery event:'});
            }
            res.json({message: "delivery created"});
        });

        // testing data

        // item.products = [{
        //   product: mongoose.Types.ObjectId('578aa723466e37bc1415d497'),
        //   p_vid: mongoose.Types.ObjectId('578aa4487861d1d40fa674f2'),
        //   unit_price: 99.99,
        //   num_sold: 999
        // }];
    },

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

                EventModel.find()
                    .where('_id')
                    .in(event_ids)
                    .populate('products.product')
                    .lean() //http://stackoverflow.com/questions/31824054/cannot-delete-json-element
                    .exec(function(err,items){
                    if (err) {
                        return res.send(err);
                    }

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
            });
        }
        else
        {
            EventModel.find()
            .populate('products.product')
            .limit(limit_doc)
            .skip(skip_doc)
            .sort(order + order_by)
            .lean() //http://stackoverflow.com/questions/31824054/cannot-delete-json-element
            .exec(function (err, items) {
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
        }

    },

    getOne: function (req, res) {
        EventModel.findById(req.params.event_id)
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
        EventModel.findById(req.params.event_id, function (err, item) {
            if (err) res.send(err);

            EventModel.schema.eachPath(function(path) {
                if (_.has(req.body, path)){
                    _.set(item, path, _.get(req.body, path));
                }
            });

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "event updated"});
            });

        });
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
