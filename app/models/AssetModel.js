var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId;

var AssetSchema = new Schema({
    filename: {type:String, required: true},
    filetype: {type:String, required: true},
    unique_filename: {type: String, required: true},
    path: {type: String, required: true}, //e.g. /assets/abcd.jpg
    full_url: {type: String, required: true}, //e.g. http://imgur.com/xyz/abcd.jpg, could be external, not necessarily uploaded to server
    description: {type: String},
    created_by: {type: Schema.Types.ObjectId, ref: 'User'}
    },

    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);


module.exports = mongoose.model('Asset', AssetSchema);
