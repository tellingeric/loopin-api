var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectIdSchema = Schema.ObjectId;

var ProductSchema = new Schema({
  
  name: {type: String, required: true},
  vendor: {type: Schema.Types.ObjectId, ref: 'Vendor', required: true},//should be an ObjectId, keep it simple for now
  created_by: {type: Schema.Types.ObjectId, ref: 'User'},
  details: [{
      //vid: {type: String, required: true},
      //no need for this vid, Mongoose creates _id for each embedded document
    description: String,
    price: Number,
    created_by: {type: Schema.Types.ObjectId, required: true},//assuming saving every change as a 'version'; only needs 'create', no 'update'
    create_at: Date,
    img_url: String,
    img_path: String, //internal, assets uploaded to server
    options: [{
      name: String,
      selections: [String],
      isMultiple: Boolean}]
  }]
  },
  
  {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);



module.exports = mongoose.model('Product', ProductSchema);
