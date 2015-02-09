module.exports = function(Account) {
  Account.disableRemoteMethod('find', true);
  Account.disableRemoteMethod('exists', true);
  Account.disableRemoteMethod('count', true);
};
