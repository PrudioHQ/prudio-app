var lt = require('loopback-testing');
var chai = require('chai');
var assert = chai.assert;

//path to app.js or server.js
var app = require('../../server/server.js');

//create a server
app.models.Servers.create({
  active: true,
  name: 'prudio-xxx',
  server: 'XXX',
  address: 'https://prudio-xxx.herokuapp.com',
  port: 443,
  region: 'xx',
  apps: 0
});

app.models.externalProviderToken.create({
  provider: 'slack',
  token: 'xoxp-xxxxxxxx-xxxxx-xxxx-xxxx',
  scope: 'identify,read,post',
  url: 'https://team.slack.com/',
  team: 'Team',
  user: 'User',
  teamId: 'T00000000',
  userId: 'U00000000',
  accountId: 2
});

describe('/api/users', function() {
  lt.beforeEach.withApp(app);

  var newUser = {
    fname: 'John',
    lname: 'Doe',
    email: 'john@doe.com',
    password: 'johndoe'
  };

  var newUser2 = {
    id: 2,
    fname: 'Jane',
    lname: 'Doe',
    email: 'jane@doe.com',
    password: 'janedoe'
  };

  var newApp = {
    name: 'Testing app',
    appId: 'XXX',
    active: true,
    online: true,
    join: false,
    slackApiToken: 'xoxp-xxxxxxxx-xxxxx-xxxx-xxxx',
    slackBotToken: 'xoxb-xxxxxxxx-xxxxxxxxxx',
    slackInviteUser: 'U00000000',
    slackInviteBot: 'U00000000',
    notifyChannel: 'C00000000',
    roomCount: 1,
    roomPrefix: 'sp-',
    server: 'XXX',
    socketURL: 'https://prudio-xxx.herokuapp.com:443'
  };

  lt.describe.whenCalledRemotely('GET', '/api/users', function() {
    it('should not exist', function() {
      assert.equal(this.res.statusCode, 404);
    });
  });

  lt.describe.whenCalledRemotely('PUT', '/api/users', function() {
    lt.it.shouldBeDenied();
  });

  lt.describe.whenCalledRemotely('POST', '/api/users', function() {
    it('should require validation', function() {
      assert.equal(this.res.statusCode, 422);
    });
  });

  describe('Registration', function() {
    lt.describe.whenCalledRemotely('POST', '/api/users', {}, function() {
      it('should require all 4 fields to be filled', function() {
        var codes = this.res.body.error.details.codes;
        assert.include(codes.fname, 'presence');
        assert.include(codes.lname, 'presence');
        assert.include(codes.password, 'presence');
        assert.include(codes.email, 'format.null');
      });
    });

    lt.describe.whenCalledRemotely('POST', '/api/users', newUser, function() {
      it('when given all fields it should create a new user', function() {
        assert.equal(this.res.statusCode, 200);

        //Missing database validation

        //Missing REST end point validation
      });
    });
  });

  describe('Login', function() {
    lt.describe.whenCalledRemotely('POST', '/api/users/login', {}, function() {
      it('should require email address', function() {
        assert.equal(this.res.statusCode, 400);
        assert.equal(this.res.body.error.code, 'USERNAME_EMAIL_REQUIRED');
      });
    });

    lt.describe.whenCalledRemotely('POST', '/api/users/login', { email: newUser.email, password: 'wrong' }, function() {
      it('should fail with invalid password', function() {
        assert.equal(this.res.statusCode, 401);
        assert.equal(this.res.body.error.code, 'LOGIN_FAILED');
      });
    });

    lt.describe.whenCalledRemotely('POST', '/api/users/login', { email: newUser.email, password: newUser.password }, function() {
      it('should success with valid credentials', function() {
        assert.equal(this.res.statusCode, 200);
      });
    });
  });

  describe('Accounts', function() {

    lt.describe.whenCalledByUser(newUser2, 'GET', '/api/users/1/accounts', function() {
      it('should not be allowed', function() {
        assert.equal(this.res.statusCode, 401);
        assert.equal(this.res.body.error.code, 'AUTHORIZATION_REQUIRED');
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'GET', '/api/users/2/accounts', function() {
      it('should exist and name be equal', function() {
        assert.equal(this.res.statusCode, 200);
        assert.equal(this.res.body[0].name, newUser2.fname + ' ' + newUser2.lname + '\'s Account');
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'POST', '/api/accounts/2/apps', newApp, function() {
      it('should create app', function() {
        assert.equal(this.res.statusCode, 200);
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'GET', '/api/accounts/2/apps', function() {
      it('app should exist', function() {
        assert.equal(this.res.statusCode, 200);
        assert.equal(this.res.body[0].name, newApp.name);
        assert.equal(this.res.body[0].accountId, 2);
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'GET', '/api/accounts/2/apps/count', function() {
      it('should have one app', function() {
        assert.equal(this.res.statusCode, 200);
        assert.equal(this.res.body.count, 1);
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'DELETE', '/api/accounts/2/apps/1', function() {
      it('should delete app', function() {
        assert.equal(this.res.statusCode, 204);
      });
    });

    lt.describe.whenCalledByUser(newUser2, 'GET', '/api/accounts/2/apps/count', function() {
      it('should have one app', function() {
        assert.equal(this.res.statusCode, 200);
        assert.equal(this.res.body.count, 0);
      });
    });

  });

});
