var mongoose = require('mongoose');
var EventModel = require('../models/EventModel');

var Events = {
    //getAll, getOne, createOne, deleteOne, updateOne

    getAll: function (req, res) {
        var order_by = req.query.order_by || 'name',
            order = req.query.order || '',//''= asc, '-'=desc
            limit_doc = req.query.limit || 0,
            skip_doc = req.query.skip || 0;

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
            item.name = item.name + '_Updated';

            item.save(function (err) {
                if (err) res.send(err);
                res.json({message: "event updated"});
            });

        });
    },

    createOne: function (req, res) {
        var rand_name = 'Event_' + Math.floor((Math.random() * 1000) + 1);

        var dummy_img = 'http://i.imgur.com/jHcilUJ.jpg';
        var dummy_user = 'dummy user id';

        var item = new EventModel();
        //all fake data
        item.name = rand_name;
        item.description = 'lap dance';
        item.creator_user_id = dummy_user;
        item.eventDate = Date.now();
        item.active_from = Date.now();
        item.active_end = Date.now();
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

        item.save(function (err) {
            if (err) res.send(err);
            res.json({message: "event created"});
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
