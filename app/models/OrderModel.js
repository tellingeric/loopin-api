var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
        products: [{
            product_id: {type: String, required: true},
            product_vid: {type: String, required: true},
            unitPrice: Number,
            num_sold: Number
        }],
        delivery_address : {
            street1 : String,
            street2 : String,
            city : String,
            state : String,
            zipCode : String,
            country : String
        },
        buyer_user_id: {type: String, required: true},
        order_date: Date,
        event_id: { type: Schema.Types.ObjectId, ref: 'Event' } //optional, may not be purchased from an event
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


module.exports = mongoose.model('Order', OrderSchema);
