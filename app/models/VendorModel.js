var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
    name : String,
    address : {
      street1 : String,
      street2 : String,
      city : String,
      state : String,
      zipCode : String,
      country : String
    },
    loc:{
        type: [Number], //longtitude, latitude
        index: '2d' //create geospatial index
    },
    email : String,
    phone : String,
    type : String,
    img_path: String, //internal, assets uploaded to server
    img_relative_url: String
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);

VendorSchema.virtual('events', {
    ref: 'Event', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'vendor' // is equal to `foreignField`
});

VendorSchema.options.toJSON = { virtuals: true };

module.exports = mongoose.model('Vendor', VendorSchema);
