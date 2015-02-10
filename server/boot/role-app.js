module.exports = function(app) {
  var Role = app.models.Role;
  var User = app.models.user;
  var App = app.models.App;

  // TODO: check if user belongs to App
  Role.registerResolver('appRole', function(role, context, cb) {

    function reject(msg) {
      console.log(msg);
      process.nextTick(function() {
        cb(null, false);
      });
    }
    
    var userId = context.accessToken.userId;
    if (!userId || !context.modelId) {
      return reject('Invalid access token');
    }

    User.findById(userId, function provideModel(err, user) {
      if (err || !user) {
        return reject('Invalid access token');
      }

      user.accounts(function (err, accounts) {
        if (err || !accounts) {
          reject("Unauthorized!");
        } else {
          var accountsId = [];

          for (var i = accounts.length - 1; i >= 0; i--) {
            accountsId.push(accounts[i].id);
          }

          App.find({ where: { accountId: accountsId, id: context.modelId } }, function(err, apps) {
            if (err) {
              reject("Unauthorized!");
            }
            if (apps.length > 0) {
              return cb(null, true);
            } else {
              reject("Unauthorized!");
            }
          });
        }
      });
    });
  });
}
