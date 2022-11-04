const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
   name: {
      type: String
   },
   username: {
    type: String
   },
   password: {
    type: String
   },
   gender: {
    type: String
   },
   email: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   birthDate: {
    type: Date
 }
}, {
   collection: 'users'
})

User.pre(
   'save',
   async function(next) {
     const user = this;
     const hash = await bcrypt.hash(this.password, 10);
 
     this.password = hash;
     next();
   }
 );

const userInst = mongoose.model('User', User);
module.exports = mongoose.model('User', User);

module.exports.getUserById = function(id, callback){
  userInst.findById(id, callback);
 }
 
 module.exports.getUserByUsername = function(username, callback){
   const query = {username: username}
   userInst.findOne(query, callback);
 }
 
 module.exports.addUser = function(newUser, callback){
   bcrypt.genSalt(10, (err, salt) => {
     bcrypt.hash(newUser.password, salt, (err, hash) => {
       if(err) throw err;
       newUser.password = hash;
       newUser.save(callback);
     });
   });
 }
