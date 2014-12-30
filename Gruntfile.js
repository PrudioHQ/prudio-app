module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
        // clean: ["server/boot/explorer.js"]
    });

    // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    // grunt.registerTask('build', ['clean']);
    grunt.registerTask('default');

};
