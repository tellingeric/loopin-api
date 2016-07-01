var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    Name : String,
    Description : String,
    StartDate : Date,
    EndDate : Date,

    Cancellable : Boolean


    //admins : [{user_id : ObjectId, username : String}]

});


module.exports = mongoose.model('Event', EventSchema);
