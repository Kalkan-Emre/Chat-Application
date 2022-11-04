const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Message = new Schema({
   to: {
      type: String
   },
   from: {
    type: String
   },
   messageBody: {
    type: String
   },
   date: {
    type: Date
 }
}, {
   collection: 'messages'
})
module.exports = mongoose.model('Message', Message)