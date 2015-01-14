# Prud.io App [![Codacy Badge](https://www.codacy.com/project/badge/770f6a0903d641bd8bf31f041914a615)](https://www.codacy.com/public/cossou/prudio-app) <a href="https://assembly.com/prudio/bounties"><img src="https://asm-badger.herokuapp.com/prudio/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## Building the application

### Requirements
* [Node](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com/)

### Installation
1. Install the *Node* dependencies: `npm install`.
2. Install *Strongloop*: `npm install -g strongloop`.
3. Install *Gulp*: `npm install -g gulp`.
4. Install *Bower* dependencies: `npm install -g bower`.
5. Install the *Bower* dependencies: `bower install`.
6. Run the *Gulp* build task: `gulp build`.

## Running the application (API Server + Dashboard)

### Steps

1. Run `slc run` and open your browser at [http://localhost:3000/](http://localhost:3000/).
2. Run the gulp default task: `gulp`. This will build any changes made automatically.
3. Open your browser at [http://localhost:3000/explorer](http://localhost:3000/explorer) to check the API endpoints.
