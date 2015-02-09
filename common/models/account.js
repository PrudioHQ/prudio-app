module.exports = function(Account) {
  Account.disableRemoteMethod('find', true);
  Account.disableRemoteMethod('exists', true);
  Account.disableRemoteMethod('count', true);
  Account.disableRemoteMethod('create', true);
  Account.disableRemoteMethod('upsert', true);
  Account.disableRemoteMethod('updateAll', true);
  Account.disableRemoteMethod('findOne', true);
};
