var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	ngmin = require('gulp-ngmin'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uncss = require('gulp-uncss'),
	uncsst = require('gulp-uncss-task'),
	minify = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	gifsicle = require('imagemin-gifsicle'),
	glob = require('glob');

//配置需要进行处理的相关文件路径
var paths = {
	//js部分
	common_script:['js/scripts/**/*.js'],
	//css部分
	common_css:['css/*.css'],
	//html部分
	all_html:['views/**/*.html'],
	//图片部分
	all_image:["images/*.png","images/*.jpg","images/*.gif"]
};

gulp.task('default', function() {
  // place code for your default task here
});
//公共js压缩任务
gulp.task('check-cjs', function() {
  gulp.src(paths.common_script)
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});
gulp.task('mini-cjs', function() {
  gulp.src(paths.common_script)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('tem-util.js'))
	.pipe(ngmin())
	.pipe(gulp.dest('build/js'))
	.pipe(uglify({mangle: false}))
	.pipe(rename('tem-util.min.js'))
	.pipe(gulp.dest('build/js'));
});

/***************************css部分*****************************/
//门户和公共部分
gulp.task('uncss-cp', function() {
	//console.log(glob.sync(paths.all_html));
    gulp.src(paths.common_css)
        .pipe(uncss({
            html: paths.all_detail_html
        }))
		.pipe(gulp.dest('build/css/uncss'))
		.pipe(concat('tem-util.css'))
		.pipe(gulp.dest('build/css/uncss'))
		.pipe(minify())
		.pipe(rename('tem-util.min.css'))
		.pipe(gulp.dest('build/css/uncss/min'));
});
gulp.task('minicss-cp', function() {
	//console.log(glob.sync(paths.all_html));
    gulp.src(paths.common_css)
		.pipe(concat('util.css'))
		.pipe(gulp.dest('build/css'))
		.pipe(minify())
		.pipe(rename('util.min.css'))
		.pipe(gulp.dest('build/css'));
});

//图片压缩
//commons
gulp.task("mini-image",function(){
	return gulp.src(paths.all_image)
    .pipe(imagemin({
//    	optimizationLevel:5,//png使用
//    	interlaced:false,
//        progressive: true,//jpg使用
//        svgoPlugins: [{removeViewBox: false}],//svg使用
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('build/images'));
});

//主方法
gulp.task('build-css',['uncss-cp']);
//主方法-images
gulp.task('build-images',['mini_image']);
//主方法
gulp.task('build',['mini-cjs']);
//主方法
gulp.task('build-js',['mini-cjs']);
