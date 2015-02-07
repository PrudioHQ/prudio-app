module.exports = function(app) {
  var Role = app.models.Role;
  var Team = app.models.Team;

  Role.registerResolver('teamMember', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // if the target model is not app
    if (context.modelName !== 'App') {
      return reject();
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    // check if userId is in team table for the given app id
    context.model.findById(context.modelId, function(err, app) {
      if (err || !app)
        return reject();

      Team.count({
        ownerId: app.ownerId,
        memberId: userId
      }, function(err, count) {
        if (err) {
          console.log(err);
          return cb(null, false);
        }

        cb(null, count > 0); // true = is a team member
      });
    });
  });
}