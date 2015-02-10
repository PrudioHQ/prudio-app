module.exports = function(app) {
  var Role = app.models.Role;

  // TODO: check if user belongs to App
  Role.registerResolver('appRole', function(role, context, cb) {

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
      if (err || !model) {
        return reject('No relative model found.');
      }

      var modelWithUsers = null;
      if (model.users) {
        modelWithUsers = model;
      }
      if (model.account) {
        modelWithUsers = model.account;
      }
      if (!modelWithUsers) {
        reject('Model cannot be linked to user, so this role should fail.');
      }

      modelWithUsers.users.findById(userId, function postFind(err, users) {
        if (err || !users) {
          reject("Unauthorized!");
        } else {
          cb(null, true);
        }
      });

    });
  });
}
