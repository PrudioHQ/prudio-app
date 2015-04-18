var lt = require('loopback-testing');
var chai = require('chai');
var assert = chai.assert;

//path to app.js or server.js
var app = require('../../server/server.js');

describe('/api/users', function() {
  lt.beforeEach.withApp(app);

  var newUser = {
    fname: 'John',
    lname: 'Doe',
    email: 'john@doe.com',
    password: 'johndoe'
  }

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
});
