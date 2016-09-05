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
    type : String
    },
    {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }}
);


module.exports = mongoose.model('Vendor', VendorSchema);
