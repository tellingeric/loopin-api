var EventModel = require('../models/EventModel');

var Events = {
  //getAll, getOne, createOne, deleteOne, updateOne

  getAll: function (req, res) {
    var order_by = req.query.order_by || 'name',
        order = req.query.order || '',
        limit_doc = req.query.limit || 0,
        skip_doc = req.query.skip || 0;

    EventModel.find().
    limit(limit_doc).
    skip(skip_doc).
    sort(order+order_by).
    exec(function (err, items) {
      if (err) res.send(err);
      res.json(items);
    });

  },

  getOne: function (req, res) {
    EventModel.findById(req.params.event_id, function (err, item) {
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

    var item = new EventModel();
    //all fake data
    item.name = rand_name;
    item.description = 'lap dance';
    item.creator_user_id = '577feda0c0d56fab4dbc586e';
    item.eventDate = Date.now();
    item.active_from = Date.now();
    item.active_end = Date.now();
    item.cancellable = true;
    item.img_url = 'http://localhost:3000/somthing.png',
    item.delivery_schedule = [{
      location : 'LGA',
      arrival_time : Date.now()
    },{
      location : 'JFK',
      arrival_time : Date.now()
    }];
    item.vendor_id = '577feda0c0d56fab4dbc586e';
    item.products = [{
      product_id : '577feda0c0d56fab4dbc586e',
      product_vid : '577feda0c0d56fab4dbc586e',
      unitPrice : 5.97,
      num_sold: 10
    }];

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
  }
};

module.exports = Events;
