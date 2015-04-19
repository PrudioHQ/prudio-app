module.exports = function(externalProviderToken) {


	externalProviderToken.observe('before save', function updateTimestamp(ctx, next) {

		// If instance = new object
        if (ctx.isNewInstance) {
            ctx.instance.created  = new Date();
            ctx.instance.modified = new Date();
        } else if (ctx.instance) {
            ctx.instance.modified = new Date();
		} else if (ctx.data) {
			ctx.data.modified = new Date();
		}

        next();
    });

};
