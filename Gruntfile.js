module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'main.css': 'main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'main.min.css': 'main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERCO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                }
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERCO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify')

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'replace:dist', 'uglify']);
}