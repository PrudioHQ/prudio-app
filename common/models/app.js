module.exports = function(App) {

	// Hide all methods 
	// Only because we need it in the lb-services (Angular SDK)

    App.disableRemoteMethod('find', true);
    App.disableRemoteMethod('count', true);
    App.disableRemoteMethod('exists', true);
    App.disableRemoteMethod('create', true);
    App.disableRemoteMethod('upsert', true);
    App.disableRemoteMethod('findById', true);
    App.disableRemoteMethod('deleteById', true);
    App.disableRemoteMethod('findOne', true);
    App.disableRemoteMethod('updateAll', true);
    App.disableRemoteMethod('prototype.updateAttributes', true);
    App.disableRemoteMethod('prototype.__get__account', true);
};
