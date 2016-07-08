var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProductSchema = new Schema({
    name: {type: String, required: true},
    vendor_id: {type: ObjectId, required: true},
    creator_user_id: {type: ObjectId, required: true},
    details: [{
        vid: {type: ObjectId, required: true},
        description: String,
        price: Number,
        creator_user_id: {type: ObjectId, required: true},//assuming saving every change as a 'version'; only needs 'create', no 'update'
        create_at: Date,
        img_url: String,
        options: [{option_name: String, option_value: String}]
    }]
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

module.exports = mongoose.model('Product', ProductSchema);
