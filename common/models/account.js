module.exports = function(Account) {
	Account.disableRemoteMethod('find', true);
	Account.disableRemoteMethod('exists', true);
	Account.disableRemoteMethod('count', true);
	Account.disableRemoteMethod('create', true);
	Account.disableRemoteMethod('upsert', true);
	Account.disableRemoteMethod('updateAll', true);
	Account.disableRemoteMethod('findOne', true);


	Account.beforeUpdate = function(next, account) {
		account.modified = new Date();
		next();
	}

	Account.beforeCreate = function(next, account) {
		account.created = new Date();
		account.modified = new Date();
		next();
	}
};
