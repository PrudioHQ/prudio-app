module.exports = function(externalProviderToken) {


	externalProviderToken.observe('before save', function beforeSave(ctx, next) {

        // If instance = new object
        if (ctx.instance) {
            ctx.instance.created  = new Date();
            ctx.instance.modified = new Date();
        } else {
            ctx.data.modified = new Date();
        }

        next();
    });

};
