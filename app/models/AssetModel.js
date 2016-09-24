var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId;

var AssetSchema = new Schema({
    orig_filename: {type:String, required: true},
    filetype: {type:String, required: true},
    unique_filename: {type:String, required: true},
    path: String, //e.g. /assets/abcd.jpg, only used if the asset is uploaded to our server
    relative_url: String, //path without '/public'
    full_url: String, //e.g. http://imgur.com/xyz/abcd.jpg, only used if the asset is external
    description: {type: String},
    size: Number,
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
    },

    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);


module.exports = mongoose.model('Asset', AssetSchema);
