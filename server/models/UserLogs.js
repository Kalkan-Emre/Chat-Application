const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let UserLogs = new Schema({
   username:{
    type: String
   },
   activity: {
      type: String
   },
   date: {
    type: Date
 }
}, {
   collection: 'logs'
})
module.exports = mongoose.model('UserLogs', UserLogs)

module.exports.paginate = function(pageNo, limit, callback){

   var skip = limit * (pageNo - 1);
   var totalCount;
   
   //count documents
   this.count({}, function(err, count){
      if(err){
         totalCount = 0;
     }
     else{
         totalCount = count;
     }
 })

   if(totalCount == 0){
       return callback('No Document in Database..', null);
   }
   //get paginated documents
   this.find().skip(skip).limit(limit).exec(function(err, docs){

       if(err){
           return callback('Error Occured', null);
       }
       else if(!docs){
           return callback('Docs Not Found', null);
       }
       else{
           var result = {
               "totalRecords" : totalCount,
               "page": pageNo,
               "nextPage": pageNo + 1,
               "result": docs
           };
           return callback(null, result);
       }

   });
}