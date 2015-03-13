module.exports = {
	"mandrill": {
		"apikey": process.env.MANDRILL_APIKEY
	},
	"db": {
		"connector": "loopback-connector-mongodb",
		"url": process.env.MONGOLAB_URI
	}
}
