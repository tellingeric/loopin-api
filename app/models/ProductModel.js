var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name : String,
  vendor_id : String,
  created_by : String,
  details: [{
    vid: String,
    description : String,
    price : Number,
    updated_by: String,
    img_url : String,
    options : String
  }]
});

module.exports = mongoose.model('Product', ProductSchema);
