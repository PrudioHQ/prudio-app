# Prud.io App [![Codacy Badge](https://www.codacy.com/project/badge/770f6a0903d641bd8bf31f041914a615)](https://www.codacy.com/public/cossou/prudio-app) <a href="https://assembly.com/prudio/bounties"><img src="https://asm-badger.herokuapp.com/prudio/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## Building the application

### Requirements
* [Node](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com/)

### Installation
1. Install *Bower*: `sudo npm install -g bower`.
2. Install *Strongloop*: `sudo npm install -g strongloop`.
3. *For Ubuntu*, the following needs to be run: `sudo apt-get install nodejs-legacy`
4. Install *Gulp*: `sudo npm install -g gulp`.
5. Install the *Node* dependencies: `sudo npm install`.
6. Install the *Bower* dependencies: `bower install`.
7. Run the *Gulp* build task: `sudo gulp build`.

## Running the application (API Server + Dashboard)

### Steps

1. Run `slc run` and open your browser at [http://localhost:3000/](http://localhost:3000/).
2. Run the gulp default task: `gulp`. This will build any changes made automatically.
3. Open your browser at [http://localhost:3000/explorer](http://localhost:3000/explorer) to check the API endpoints.

## Running the test suite

* Use the following command to run the api test suite: `npm test`
* For end-to-end tests use: `npm run-script test-e2e`

All code related to the tests are under the `test` folder.  
[loopback-testing](https://github.com/strongloop/loopback-testing) is being used for api tests and `protractor`for e2e tests.
