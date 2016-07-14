var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
    name : {type: String,requried: true},
    description : String,
    creator_user_id: String, //should be an ObjectId, keep it simple for now
    eventDate : Date,
    active_from : Date,
    active_end : Date,
    cancellable : Boolean,
    img_url: String,
    delivery_schedule : [{
      location : String,
      arrival_time : Date
    }],
    vendor_id: {type: String, required: true},
    products : [{
      product_id : { type: Schema.Types.ObjectId, ref: 'Product' },
      product_vid : { type: Schema.Types.ObjectId, ref: 'Product.details' },
      unit_price : Number,
        num_sold: Number
    }]
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
  );


module.exports = mongoose.model('Event', EventSchema);
