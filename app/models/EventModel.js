var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
    name : {type: String,required: true},
    description : String,
    created_by: {type: Schema.Types.ObjectId, ref: 'User', required: true},  //should be an ObjectId, keep it simple for now
    eventDate : Date,
    active_from : Date,
    active_end : Date,
    cancellable : Boolean,
    img_url: String, //assume this is external
    img_path: String, //internal, assets uploaded to server, USE img_relative_url INSTEAD
    img_relative_url: String,
    delivery_schedule : [{
      location : String,
      arrival_time : Date
    }],
    vendor: {type: Schema.Types.ObjectId, ref: 'Vendor'},
    products : [{
      product : { type: Schema.Types.ObjectId, ref: 'Product' },
      p_vid : { type: Schema.Types.ObjectId, ref: 'Product.details'},
      unit_price : Number,
      num_sold: Number
    }]
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
  );


module.exports = mongoose.model('Event', EventSchema);