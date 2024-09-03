const { src, dest, watch } = require('gulp');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify-es').default;
const newer = require('gulp-newer');
const connect = require('gulp-connect');
const cors = require('cors');

const vendor = {
    css: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],
    js: [
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    ]
};

const site = {
    css: {
        in: 'src/scss/styles.scss',
        watch: 'src/scss/**/*.scss',
    },
    js: {
        in: 'src/js/**/*.js',
        watch: 'src/js/**/*.js'
    },
    php: {
        in: 'src/template/**/*.html',
        watch: 'src/template/**/*.html',
    },
    img: 'src/img/**/*',
    font: 'src/font/**/*'
}

const proxyUrl = 'localhost/mt-instructor';
const rootPath = 'dist/';
const assetsPath = rootPath + 'assets/';

function vendorCss() {
    // do not perform any action 
    // if there's not a single vendor css library added
    if (!vendor.css.length) return false;

    return src(vendor.css)
        .pipe(sass())
        .pipe(replace('/*!', '/*'))
        .pipe(concat('vendor.min.css'))
        .pipe(dest(assetsPath + 'css'));
}

function vendorJs() {
    // do not perform any action 
    // if there's not a single vendor js library added
    if (!vendor.js.length) return false;

    return src(vendor.js)
        .pipe(uglify({ mangle: true }))
        .pipe(concat('vendor.min.js'))
        .pipe(dest(assetsPath + 'js'));
}

function siteCss() {
    return src(
        site.css.in,
        { allowEmpty: true }
    )
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: true,
        includePaths: site.css.includes
    }))
    .pipe(replace('/*!', '/*'))
    .pipe(postcss([
        autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
        cssnano()
    ]))
    .pipe(concat('style.min.css'))
    .pipe(dest(assetsPath + 'css'),)
    .pipe(browserSync.stream());
}

function siteJs() {
    return src(
            site.js.in,
            { allowEmpty: true }
        )
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify({ mangle: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write(''))
        .pipe(dest(assetsPath + 'js'));
}

function sitePHP() {
    return src(site.php.in)
        .pipe(newer(rootPath))
        .pipe(dest(rootPath));
}

function siteImg() {
    return src(site.img)
        .pipe(newer(assetsPath + 'img'))
        .pipe(dest(assetsPath + 'img'));
}

function siteFont() {
    return src(site.font)
        .pipe(newer(assetsPath + 'font'))
        .pipe(dest(assetsPath + 'font'));
}

function browser() {
    // browserSync.init({
    //     proxy: proxyUrl,
    //     reloadOnRestart: true,
    //     open: false,
    //     files: [
    //         './**/*.html'
    //     ]
    // });

    browserSync.init({
        server: {
            baseDir: 'dist',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    });

    watch(site.css.watch, siteCss);
    watch(site.js.watch, siteJs).on('change', browserSync.reload);
    watch(site.php.watch, sitePHP).on('change', browserSync.reload);
}

exports.siteImg = siteImg;

exports.default = () => {
    vendorCss();
    vendorJs();
    siteJs();
    siteCss();
    sitePHP();
    siteImg();
    siteFont();

    browser();
}
