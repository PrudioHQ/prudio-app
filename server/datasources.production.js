module.exports = {
  "db": {
    "name": "db",
    "connector": "loopback-connector-mongodb",
    "url": process.env.MONGOLAB_URI
  }
};
