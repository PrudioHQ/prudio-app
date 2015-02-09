module.exports = function(App) {
    App.disableRemoteMethod('find', true);
    App.disableRemoteMethod('count', true);
    App.disableRemoteMethod('exists', true);
};
