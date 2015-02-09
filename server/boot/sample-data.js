module.exports = function(application) {

  var User = application.models.user;
  //var Role = application.models.Role;
  //var RoleMapping = application.models.RoleMapping;
  var App = application.models.App;
  var Account = application.models.Account;
  var environment = process.env.NODE_ENV || 'development';

  if (environment !== 'development') {
    return;
  }


  User.count(function(err, count) {
    if (err) {
      console.log('Error counting users: ', err);
      throw err;
    }

    if (count > 0) {
      console.log("Already migrated data")
      return;
    } 
    
    console.log('Migrating sample data');

    User.create([
      { fname: 'Hélder', lname: 'Duarte', email: 'cossou@gmail.com', password: '123456' },
      { fname: 'John',   lname: 'Doe', email: 'john@apps.com', password: '123456' },
      { fname: 'Marcos', lname: 'Antonoudiou', email: 'marcos@ant.com', password: '123456' },
      { fname: 'Miguel', lname: 'Angelo', email: 'mike@apps.com', password: '123456' }
    ], 
    function(err, users) {
      if (err) {
        console.log('Error fetching users: ', err);
        throw err;
      }
    });

    // TODO: It does not work! The account is only created after...
    Account.find(function(err, accounts) {
      if (err) {
        console.log('Error fetching accounts: ', err);
        throw err;
      }

      if (accounts.length === 0) {
        console.log('No accounts: ', accounts);
        return; 
      }

      console.log('Accounts: ', accounts);

      accounts[0].apps.create([
        { 
          name: "App 1",
          slack_api_token: "xxx",
          slack_bot_token: "bot",
          slack_invite_user: "uuu",
          slack_invite_bot: "bbb",
          room_count: 0,
          room_prefix: "sp-",
          accountId: 1
        },
        { 
          name: "App 2",
          slack_api_token: "yyy",
          slack_bot_token: "bot",
          slack_invite_user: "uuu",
          slack_invite_bot: "bbb",
          room_count: 0,
          room_prefix: "xp-",
          accountId: 2
        }
      ], 
      function(err, apps) {
        if (err) {
          console.log('Error creating apps: ', err);
          throw err;
        }
      });
    });
  });
};