module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/*.js'],
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        jshint:{
            options: {
                //大括号包裹
                curly: true,
                //对于简单类型，使用===和!==，而不是==和!=
                eqeqeq: true,
                //对于首字母大写的函数（声明的类），强制使用new
                newcap: true,
                //禁用arguments.caller和arguments.callee
                noarg: true,
                //对于属性使用aaa.bbb而不是aaa['bbb']
                sub: true,
                //查找所有未定义变量
                undef: true,
                //查找类似与if(a = 0)这样的代码
                boss: true,
                //指定运行环境为node.js
                node: true
            },
            //具体任务配置
            files: {
                src: ['src/*.js']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }

    });


    // 加载包含 "jshint" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 加载包含 "jshint" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');


    // 执行jshint的任务列表。
    grunt.registerTask('jshint', ['concat','jshint']);
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['concat','jshint','uglify']);

};