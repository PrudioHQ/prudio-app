module.exports = function(User) {

	User.afterCreate = function(next) {

		if (this.accountId === undefined || this.accountId === 0) {
			
			var name = this.fname + " " + this.lname + "'s Account";

			this.account.create({
				name: name
			}, function(err, account) {
				if (err) {
					console.error(err);
				}
			});

		}

		next();
	}
	
	User.afterSave = function(next) {

		User.app.models.Email.send({
			async: true,
			to: this.email,
			from: 'hello@prud.io',
			subject: 'Welcome to Prud.io',
			template: {
				name: "signup-e-mail"
			},
			merge_vars: [
				{
					"rcpt": this.email,
					"vars": [
						{
							name: "name",
							content: this.fname
						}]
				}
			]
		}, 
		function(err, result) {
			if(err) {
				console.log('Upppss something crash');
				console.log(err);
			}

			next(err);
		});
	
	}
	
};
