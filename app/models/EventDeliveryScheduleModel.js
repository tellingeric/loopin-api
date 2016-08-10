var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var EventDeliveryScheduleSchema = new Schema({
    event_id : { type: Schema.Types.ObjectId, ref: 'Event' },
    active_from : Date,
    active_end : Date,
    loc:{
        type: [Number], //longtitude, latitude
        index: '2d' //create geospatial index
    },
    arrival_time : Date
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
  );


module.exports = mongoose.model('EventDeliverySchedule', EventDeliveryScheduleSchema);
