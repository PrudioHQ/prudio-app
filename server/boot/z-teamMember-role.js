module.exports = function(app) {
  var Role = app.models.Role;
  
   Role.registerResolver('teamMember', function(role, context, cb) {
     
    function reject(msg) {
      console.log(msg);
      process.nextTick(function() {
      cb(null, false);
      });
    }
    
    var userId = context.accessToken.userId;
      console.log(context.accessToken);
      if (!userId) {
      return reject("Invalid access token");
    }
    
    cb(null, true);
     
   });
};