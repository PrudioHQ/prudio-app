module.exports = function(app) {
  var Role = app.models.Role;
  var User = app.models.user;

  Role.registerResolver('userRole', function(role, context, cb) {

    function reject(msg) {
      console.log(msg);
      process.nextTick(function() {
        cb(null, false);
      });
    }

    var userId = context.accessToken.userId;
    if (!userId) {
      return reject('Invalid access token');
    }

    User.findById(context.modelId, function provideModel(err, user) {
      if (err || !user) {
        return reject('No relative model found.');
      } else if (user.id !== userId) {
        console.log("User .CTX: '" + userId  + "'");
        console.log("User user: '" + user.id + "'");
        return reject("Unauthorized!");
      } else {
        cb(null, true);
      }
    });
  });
}
