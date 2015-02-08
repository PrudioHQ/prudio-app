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
      if (!userId) {
      return reject('Invalid access token');
    }

    context.model.findById(context.modelId, function provideModel(err, model) {
      if (err || !model) { return reject('No relative model found.');}

      model.users.findById(userId, function postFind(err, users) {
        if (err || !users) {
          reject("Unauthorized!");
        } else {
          cb(null, true);
        }

      });
    });

   });
};
