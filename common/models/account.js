module.exports = function(Account) {
  Account.disableRemoteMethod('find', true);
};
