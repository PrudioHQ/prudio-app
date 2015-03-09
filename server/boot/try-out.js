module.exports = function tryOut(server) {

    server.set('view engine', 'jade');
    server.set('views', './server/boot/views')
    
    server.get('/try-out/:appid', function(req, res) {
        var appid = req.params.appid;
        res.render('try-out', { title: 'Prud.io tryout', message: 'Try out your app', appid: appid });
    });
};
