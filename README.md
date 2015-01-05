# Prud.io App

<a href="https://assembly.com/prudio/bounties"><img src="https://asm-badger.herokuapp.com/prudio/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## Building the application

### Requirements
* [NodeJS](http://nodejs.org/) (with [NPM](https://www.npmjs.org/))
* [Bower](http://bower.io)
* [Gulp](http://bower.io)

### Installation
1. Install the NodeJS dependencies: `npm install`.
2. Install the Bower dependencies: `bower install`.
3. Run the gulp build task: `gulp build`.

## Running the application (API Server + Dashboard)

### Steps

1. Run `slc run` and open your browser at [http://localhost:3000/](http://localhost:3000/).
2. Run the gulp default task: `gulp`. This will build any changes made automatically, and also run a live reload server.
3. Open your browser at [http://localhost:3000/explorer](http://localhost:3000/explorer) to check the API endpoints.
