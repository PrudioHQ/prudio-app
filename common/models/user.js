module.exports = function(User) {

	User.afterSave = function(next) {

		User.app.models.Email.send({
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

			return next(err);
		});
	}
};
