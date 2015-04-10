var request = require('request');
var qs      = require('querystring');

module.exports = function(Account) {
	Account.disableRemoteMethod('find', true);
	Account.disableRemoteMethod('exists', true);
	Account.disableRemoteMethod('count', true);
	Account.disableRemoteMethod('create', true);
	Account.disableRemoteMethod('upsert', true);
	Account.disableRemoteMethod('updateAll', true);
	Account.disableRemoteMethod('findOne', true);

	Account.observe('before save', function beforeSave(ctx, next) {

        // If instance = new object
        if (ctx.isNewInstance) {
            ctx.instance.created  = new Date();
            ctx.instance.modified = new Date();
        } else {
            ctx.data.modified = new Date();
        }

        next();
    });

	/*
	* listSlackMembers method
	*
	*/
	Account.listSlackMembers = function(id, fk, next) {

		this.app.models.externalProviderToken.findById(fk, function(err, token) {
			if (err) {
				return next(err);
				// Maybe it's not the best solution...
			} else if (!token || token.accountId.toString() !== id) {
				return next(new Error('externalProviderToken not found!'));
			}

			var url = "https://slack.com/api/users.list";

			request
				.post({url: url, form: { token: token.token }, json: true }, function(error, response, body) {
					if (error) {
						return next(null, false, error);
					}

					return next(null, body.ok, body.members);
				})
				.on('error', function(err) {
					console.log(err);
				});
		});
	}

	Account.remoteMethod(
		'listSlackMembers',
		{
			description: "List Slack members from token",
			accepts: [
				{arg: 'id', type: 'any', required: true, description: 'PersistedModel id'},
				{arg: 'fk', type: 'any', required: true, description: 'Foreign key for externalProviderTokens'}
			],
			http: {path: '/:id/externalProviderTokens/:fk/listSlackMembers', verb: 'get'},
			returns: [
				{arg: 'success', type: 'boolean'},
				{arg: 'result', type: 'mixed'}
			]
		}
	);

	/*
	* listSlackChannels method
	*
	*/
	Account.listSlackChannels = function(id, fk, next) {

		this.app.models.externalProviderToken.findById(fk, function(err, token) {
			if (err) {
				return next(err);
				// Maybe it's not the best solution...
			} else if (!token || token.accountId.toString() !== id) {
				return next(new Error('externalProviderToken not found!'));
			}

			var url = "https://slack.com/api/channels.list";

			request
				.post({url: url, form: { token: token.token, exclude_archived: true }, json: true }, function(error, response, body) {
					if (error) {
						return next(null, false, error);
					}

					return next(null, body.ok, body.channels);
				})
				.on('error', function(err) {
					console.log(err);
				});
		});
	}

	Account.remoteMethod(
		'listSlackChannels',
		{
			description: "List Slack channels from token",
			accepts: [
				{arg: 'id', type: 'any', required: true, description: 'PersistedModel id'},
				{arg: 'fk', type: 'any', required: true, description: 'Foreign key for externalProviderTokens'}
			],
			http: {path: '/:id/externalProviderTokens/:fk/listSlackChannels', verb: 'get'},
			returns: [
				{arg: 'success', type: 'boolean'},
				{arg: 'result', type: 'mixed'}
			]
		}
	);

	/*
	* listSlackChannels method
	*
	*/
	Account.testSlackToken = function(token, next) {

		var url = "https://slack.com/api/auth.test";

		request
			.post({url: url, form: { token: token }, json: true }, function (error, response, body) {
				if (error) {
					return next(null, false, error);
				}

				return next(null, body.ok, body);
			})
			.on('error', function(err) {
				console.log(err);
			});

	}

	Account.remoteMethod(
		'testSlackToken',
		{
			description: "List Slack channels from token",
			accepts: [
				{arg: 'token', type: 'any', required: true, description: 'Slack Token'},
			],
			http: {path: '/testSlackToken', verb: 'get'},
			returns: [
				{arg: 'success', type: 'boolean'},
				{arg: 'result', type: 'mixed'}
			]
		}
	);

};
