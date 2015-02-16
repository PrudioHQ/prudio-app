exports.config = {
    // The file path to the selenium server jar ()
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
    //seleniumAddress: 'http://localhost:4444/wd/hub',

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:3000',

    // Spec patterns are relative to the location of this config.
    specs: ['e2e/*.js']
};
