var VendorModel = require('../models/VendorModel');

var Vendors = {
  getAll: function(req, res){
    VendorModel.find(function(err, vendors) {
      if (err) res.send(err);
      res.json(vendors);
    });

  },

  create: function(req, res){
    var vendor = new VendorModel();
    vendor.Name = req.body.Name;
    vendor.Address = {
      street1 : "street1",
      street2 : "street2",
      city : "city",
      state : "State",
      zipCode : "11111",
      country : "US"
    };
    vendor.email = "test@gmail.com";
    vendor.phone = "6316128465";
    vendor.type = "RESTAURANTS";

    vendor.save(function(err){
      if (err) res.send(err);
      res.json({ message: "vendor created"});
    });

  },

  remove: function(req, res){
    VendorModel.remove({
      _id: req.params.vendor_id
    }, function (err, vendor){
      if (err) res.send(err);
      res.json({message: "vendor deleted"})
    });
  }

};

module.exports = Vendors;
