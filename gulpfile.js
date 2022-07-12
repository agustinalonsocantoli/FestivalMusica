const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const webp = require('gulp-webp'); 
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

function css(done) {

    src('src/scss/**/*.scss')    // identificar el archivo de SASS 
    .pipe( plumber() )
    .pipe( sass() )     //luego compilarlo
    .pipe( postcss([ autoprefixer(), cssnano() ]))
    .pipe(dest("build/css"));     // Almacenarlo o guardarlo en el SSD


    done(); // Callback que avisa a gulp cuando llegamos al final
}

function imagenes ( done ) {
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin( opciones) ) )
    .pipe(dest("build/css"));


    done();
}

function versionWebp( done ) {

    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')    // identificar el archivo de SASS 
    .pipe( webp(opciones) )
    .pipe(dest("build/img"));     // Almacenarlo o guardarlo en el SSD

    done();
}

function versionAvif( done ) {

    const opciones = {
        quality: 50
    };
    
    src('src/img/**/*.{png,jpg}')    // identificar el archivo de SASS 
    .pipe( avif(opciones) )
    .pipe(dest("build/img"));     // Almacenarlo o guardarlo en el SSD

    done();
}

function javascript( done) {
    src('src/js/**/*.js')
    .pipe( dest("build/js"));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev);




