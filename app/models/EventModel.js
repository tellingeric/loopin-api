var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name : String,
    description : String,
    eventDate : Date,
    active_from : Date,
    active_end : Date,
    cancellable : Boolean,
    delivery_schedule : [{
      location : String,
      arrival : String
    }],
    vendor_id : String,
    products : [{
      product_id : String,
      product_vid : String,
      unitPrice : Number
    }]

});


module.exports = mongoose.model('Event', EventSchema);
