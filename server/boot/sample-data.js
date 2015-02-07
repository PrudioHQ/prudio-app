module.exports = function(application) {

  var User = application.models.user;
  var Role = application.models.Role;
  var RoleMapping = application.models.RoleMapping;
  var Team = application.models.Team;
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
      { fname: 'Hélder', lname: 'Duarte', email: 'cossou@gmail.com', password: '123456'},
      { fname: 'Marcos', lname: 'Antonoudiou', email: 'marcos@ant.com', password: '123456'},
      { fname: 'Miguel', lname: 'Angelo', email: 'mike@apps.com', password: '123456'},
      { fname: 'John',   lname: 'Doe', email: 'john@apps.com', password: '123456'}
    ], function(err, users) {
      if (err) {
        console.log('Error creating users: ', err);
        throw err;
      }
    
      // create app 1 and make john the owner
      users[0].apps.create({
        name: 'App 1'
      }, function(err, app) {
        if (err) throw err;

        // add team members
        Team.create([
          { name: "Team 1", ownerId: app.ownerId, memberId: users[0].id },
          { name: "Team 2", ownerId: app.ownerId, memberId: users[1].id }
        ], function(err, team) {
          if (err) {
            console.log('Error creating team: ', err);
            throw err;
          }

        });
      });

      //create app 2 and make the owner
      users[1].apps.create({
        name: 'App 2'
      }, function(err, app) {
        if (err) {
          console.log('Error creating app: ', err);
          throw err;
        }

        //add team members
        Team.create({
          name: "Team 3",
          ownerId: app.ownerId,
          memberId: users[1].id
        }, function(err, team) {
          if (err) {
            console.log('Error creating team: ', err);
            throw err;
          }
        });
      });

      //create the admin role
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) {
          console.log('Error creating role: ', err);
          throw err;
        }

        //make bob an admin
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: users[2].id
        }, function(err, principal) {
          if (err) {
            console.log('Error creating principal: ', err);
            throw err;
          }
        });
      });
    });
  });
};