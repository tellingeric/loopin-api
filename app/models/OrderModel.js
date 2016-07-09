var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
        products: [{
            product_id: {type: String, required: true},
            product_vid: {type: String, required: true},
            unitPrice: Number,
            num_sold: Number
        }],
        delivery_address: String,
        buyer_user_id: {type: String, required: true},
        order_date: Date
    },
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


module.exports = mongoose.model('Order', OrderSchema);
