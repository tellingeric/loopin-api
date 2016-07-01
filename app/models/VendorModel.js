var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendorSchema = new Schema({
    Name : String,
    Address : {
      Street1 : String,
      Street2 : String,
      City : String,
      State : String,
      ZipCode : String,
      Country : String
    },
    email : String,
    phone : String,
    Type : String

    //admins : [{user_id : ObjectId, username : String}]

});


module.exports = mongoose.model('Vendor', VendorSchema);
