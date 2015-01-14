module.exports = {
	"db": {
		"connector": "loopback-connector-mongodb",
		"url": process.env.MONGOLAB_URI
	},
	"mandrill": {
		"connector": "lb-connector-mandrill",
		"apikey": process.env.MANDRILL_APIKEY
	}
};
