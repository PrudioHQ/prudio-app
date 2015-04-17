module.exports = function(application) {

  var User = application.models.user;
  var Servers = application.models.Servers;
  //var Role = application.models.Role;
  //var RoleMapping = application.models.RoleMapping;
  var App = application.models.App;
  var Account = application.models.Account;
  var Accountuser = application.models.Accountuser;
  var environment = process.env.NODE_ENV || 'development';

  if (environment !== 'development') {
    console.log("Not in development mode");
    return;
  }

  User.count(function(err, count) {
    if (err) {
      console.log('Error counting users: ', err);
      throw err;
    }

    if (count > 0) {
      console.log("Already migrated data", environment)
      return;
    }

    Servers.create({
        active: true,
        name: "prudio-burkina",
        server: "BURKINA",
        address: "https://prudio-burkina.herokuapp.com",
        port: 443,
        region: "us",
        apps: 0
    },
    function(err, server) {
        if (err) {
          console.log('Error creating server.', err);
          throw err;
        }
    });

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
            slackApiToken: "xxx",
            slackBotToken: "bot",
            slackInviteUser: "uuu",
            slackInviteBot: "bbb",
            roomCount: 0,
            roomPrefix: "sp-",
            accountId: accounts[0].id
          },
          {
            name: "App 2",
            appid: "xxx2",
            slackApiToken: "yyy",
            slackBotToken: "bot",
            slackInviteUser: "uuu",
            slackInviteBot: "bbb",
            roomCount: 0,
            roomPrefix: "xp-",
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
            slackApiToken: "xxx",
            slackBotToken: "bot",
            slackInviteUser: "uuu",
            slackInviteBot: "bbb",
            roomCount: 0,
            roomPrefix: "sp-",
            accountId: accounts[0].id
          },
          {
            name: "App 4",
            appid: "dfe3",
            slackApiToken: "yyy",
            slackBotToken: "bot",
            slackInviteUser: "uuu",
            slackInviteBot: "bbb",
            roomCount: 0,
            roomPrefix: "xp-",
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
