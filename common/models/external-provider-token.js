module.exports = function(ExternalProviderToken) {

	ExternalProviderToken.beforeUpdate = function(next, ept) {
		ept.modified = new Date();
		next();
	}

	ExternalProviderToken.beforeCreate = function(next, ept) {
		ept.created = new Date();
		ept.modified = new Date();
		next();
	}
};
