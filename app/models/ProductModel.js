var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    vendor_id: {type: String, required: true},//should be an ObjectId, keep it simple for now
    creator_user_id: {type: String, required: true},
    details: [{
        vid: {type: String, required: true},
        description: String,
        price: Number,
        creator_user_id: {type: String, required: true},//assuming saving every change as a 'version'; only needs 'create', no 'update'
        create_at: Date,
        img_url: String,
        options: [{option_name: String, option_value: String}]
    }]
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

module.exports = mongoose.model('Product', ProductSchema);