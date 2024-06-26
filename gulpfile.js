const gulp = require('gulp');

const lintHTML = require('gulp-htmllint');
const lintCSS = require('gulp-stylelint');
const lintJS = require('gulp-eslint');
const deleteFiles = require('gulp-rimraf');
const minifyHTML = require('gulp-minify-html');
const minifyCSS = require('gulp-clean-css');
const minifyJS = require('gulp-terser');
//const minifyJS = require('gulp-babel-minify');
//const terser = require('terser');
const concat = require('gulp-concat');
const replaceHTML = require('gulp-html-replace');
const imagemin = require('gulp-imagemin');
const zip = require('gulp-zip');
const checkFileSize = require('gulp-check-filesize');

const babel = require("gulp-babel");
const plumber = require("gulp-plumber");

const paths = {
    src: {
        html: 'src/**.html',
        css: 'src/**.css',
        js: [
            'src/basic_stuff.js',
            'src/spritedefinitions.js',
            'src/spritebuffer.js',
            'src/imagepool.js',
            'src/musicplayer.js',
            'src/song.js',
            'src/sound_hit.js',
            'src/sound_laser.js',
            'src/music.js',
            'src/color.js',
            'src/point.js',
            'src/sprite.js',
            'src/particle.js',
            'src/task.js',
            'src/robo.js',
            'src/floor.js',
            'src/hole.js',
            'src/laser_tower.js',
            'src/laser.js',
            'src/belt.js',
            'src/game.js',
            'src/spritestacker.js',
            'src/leveldata.js',
            'src/robopower_rungame.js',
        ]
    },
    dist: {
        dir: 'dist',
        css: 'style.min.css',
        js: 'robopower.min.js'
    }
};

gulp.task('lintHTML', () => {
    return gulp.src('src/**.html')
        .pipe(lintHTML());
});

gulp.task('lintCSS', () => {
    return gulp.src(paths.src.css)
        .pipe(lintCSS({
            reporters: [{ formatter: 'string', console: true }]
        }));
});

gulp.task('lintJS', () => {
    return gulp.src(paths.src.js)
        .pipe(lintJS())
        .pipe(lintJS.failAfterError());
});

gulp.task('cleanDist', () => {
    return gulp.src('dist/**/*', { read: false })
        .pipe(deleteFiles());
});

gulp.task('buildHTML', () => {
    return gulp.src(paths.src.html)
        .pipe(replaceHTML({
            css: paths.dist.css,
            js: paths.dist.js
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('buildCSS', () => {
    return gulp.src(paths.src.css)
        .pipe(concat(paths.dist.css))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('buildJS', () => {
    return gulp.src(paths.src.js)
        .pipe(concat(paths.dist.js))
        .pipe(minifyJS({
            "toplevel": true
        }))
        .pipe(gulp.dest(paths.dist.dir));
});

gulp.task('optimizeImages', () => {
    return gulp.src(paths.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist.images));
});

gulp.task('zip', () => {
    const thirteenKb = 13 * 1024;

    gulp.src('zip/*')
        .pipe(deleteFiles());

    return gulp.src(`${paths.dist.dir}/**`)
        .pipe(zip('power.zip'))
        .pipe(gulp.dest('zip'))
        .pipe(checkFileSize({ fileSizeLimit: thirteenKb }));
});

gulp.task('test', gulp.parallel(
    'lintHTML',
    'lintCSS',
    'lintJS'
));

gulp.task('build', gulp.series(
    'cleanDist',
    gulp.parallel('buildHTML', 'buildCSS', 'buildJS' ), //'optimizeImages'
    'zip'
));

gulp.task('watch', () => {
    gulp.watch(paths.src.html, gulp.series('buildHTML', 'zip'));
    gulp.watch(paths.src.css, gulp.series('buildCSS', 'zip'));
    gulp.watch(paths.src.js, gulp.series('buildJS', 'zip'));
    //gulp.watch(paths.src.images, gulp.series('optimizeImages', 'zip'));
});

gulp.task('default', gulp.series(
    'build',
    'watch'
));