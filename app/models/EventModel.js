var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventSchema = new Schema({
    name : {type: String,requried: true},
    description : String,
    creator_user_id: ObjectId,
    eventDate : Date,
    active_from : Date,
    active_end : Date,
    cancellable : Boolean,
    img_url: String,
    delivery_schedule : [{
      location : String,
      arrival_time : Date
    }],
    vendor_id: {type: ObjectId, required: true},
    products : [{
      product_id : ObjectId,
      product_vid : ObjectId,
      unitPrice : Number
    }]
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});


module.exports = mongoose.model('Event', EventSchema);
