var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
        products: [{
            product : { type: Schema.Types.ObjectId, ref: 'Product' },
            p_vid : { type: Schema.Types.ObjectId, ref: 'Product.details'},
            options: [{
                name: String,
                selections: [String],
                isMultiple: Boolean}],
            unit_price: Number,
            num_sold: Number,
            event: { type: Schema.Types.ObjectId, ref: 'Event'} //optional, may not be purchased from an event
        }],
        delivery_address : {
            street1 : String,
            street2 : String,
            city : String,
            state : String,
            zipCode : String,
            country : String
        },
        buyer: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        order_date: Date
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


module.exports = mongoose.model('Order', OrderSchema);
