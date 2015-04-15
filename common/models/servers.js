module.exports = function(Servers) {

    Servers.observe('before save', function beforeSave(ctx, next) {

		// If instance = new object
		if (ctx.isNewInstance) {
			ctx.instance.created  = new Date();
			ctx.instance.modified = new Date();
		} else {
		    ctx.instance.modified = new Date();
		}

		next();
	});

};
