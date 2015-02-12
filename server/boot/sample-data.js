module.exports = function(application) {

  var User = application.models.user;
  //var Role = application.models.Role;
  //var RoleMapping = application.models.RoleMapping;
  var App = application.models.App;
  var Account = application.models.Account;
  var Accountuser = application.models.Accountuser;
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

    User.create(
      { fname: 'Hélder', lname: 'Duarte', email: 'cossou@gmail.com', password: '123456' }
    , 
    function(err, user) {

      console.log('USERS');

      if (err) {
        console.log('Error fetching users: ', err);
        throw err;
      }

      user.accounts(function(err, accounts) {
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
            appid: "xxx",
            slack_api_token: "xxx",
            slack_bot_token: "bot",
            slack_invite_user: "uuu",
            slack_invite_bot: "bbb",
            room_count: 0,
            room_prefix: "sp-",
            accountId: accounts[0].id
          },
          { 
            name: "App 2",
            appid: "xxx2",
            slack_api_token: "yyy",
            slack_bot_token: "bot",
            slack_invite_user: "uuu",
            slack_invite_bot: "bbb",
            room_count: 0,
            room_prefix: "xp-",
            accountId: accounts[0].id
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

    User.create(
      { fname: 'Jonh', lname: 'Doe', email: 'jonh@gmail.com', password: '123456' }
    , 
    function(err, user) {

      console.log('USERS');

      if (err) {
        console.log('Error fetching users: ', err);
        throw err;
      }

      user.accounts(function(err, accounts) {
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
            name: "App 3",
            appid: "234",
            slack_api_token: "xxx",
            slack_bot_token: "bot",
            slack_invite_user: "uuu",
            slack_invite_bot: "bbb",
            room_count: 0,
            room_prefix: "sp-",
            accountId: accounts[0].id
          },
          { 
            name: "App 4",
            appid: "dfe3",
            slack_api_token: "yyy",
            slack_bot_token: "bot",
            slack_invite_user: "uuu",
            slack_invite_bot: "bbb",
            room_count: 0,
            room_prefix: "xp-",
            accountId: accounts[0].id
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

    // TODO: It does not work! The account is only created after...
    /*
    
    */
  });
};