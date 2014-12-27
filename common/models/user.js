var properties = {
  fname: {type: String, required: true},
  lname: {type: String, required: true}
};

var options = {
  relations: {
    accessTokens: {
      model: accessToken,
      type: hasMany,
      foreignKey: userId
    },
    account: {
      model: account,
      type: belongsTo
    }
  },
  acls: [
    {
      permission: ALLOW,
      principalType: ROLE,
      principalId: $everyone
    }
  ]
};

var user = loopback.Model.extend('user', properties, options);
