module.exports = function(externalProviderToken) {

	externalProviderToken.beforeUpdate = function(next, ept) {
		ept.modified = new Date();
		next();
	}

	externalProviderToken.beforeCreate = function(next, ept) {
		ept.created = new Date();
		ept.modified = new Date();
		next();
	}
};
