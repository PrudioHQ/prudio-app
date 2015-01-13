module.exports = function(User) {

	User.afterCreate = function(next) {

		if (this.accountId === undefined || this.accountId === 0) {
						
			this.account.create({
				name: this.fname + " " + this.lname + "'s Account"
			}, function(err, account) {
				if (err) {
					console.error(err);
				} else {
					console.log('Account:', account);
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
