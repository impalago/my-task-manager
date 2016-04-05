var elixir = require('laravel-elixir');
require('laravel-elixir-ng-annotate');

var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var Task = elixir.Task;

elixir.extend('templateCache', function() {

    new Task('templateCache', function() {
        return gulp.task('templateCache', function () {
            return gulp.src('resources/assets/js/**/*.html')
                .pipe(templateCache('templateCache.js', { module:'app'}))
                .pipe(gulp.dest('resources/assets/js/'));
        });

    }).watch('resources/assets/js/**/*.html');

});


elixir.config.sourcemaps = true;

elixir(function(mix) {

    var dependenciesScripts = [
        "/jquery/dist/jquery.min.js",
        "/bootstrap/dist/js/bootstrap.min.js",
        "/bootstrap-material-design/dist/js/material.min.js",
        "/bootstrap-material-design/dist/js/ripples.min.js",
        "/lodash/lodash.min.js",
        "/angular/angular.min.js",
        "/angular-ui-router/release/angular-ui-router.min.js",
        "/angular-resource/angular-resource.min.js",
        "/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
        "/angular-animate/angular-animate.min.js",
        "/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js",
        "/angular-loading-bar/src/loading-bar.js",
        "/angular-sortable-view/src/angular-sortable-view.min.js",
        "/jquery-confirm/js/jquery-confirm.min.js",
        "/pnotify/dist/pnotify.js",
        "/pnotify/dist/pnotify.desktop.js"
    ];

    var appScripts = [
        "/resources/assets/js/**/*.js"
    ];

    mix.templateCache();

    mix.scripts(dependenciesScripts, "public/js/dependencies.js", "node_modules");
    mix.annotate(appScripts);
    mix.scripts('annotated.js','public/js/app.js', 'public/js/');

    mix.copy('resources/assets/js/**/*.html', 'public/js/');

    mix.styles([
        "/bootstrap/dist/css/bootstrap.min.css",
        "/bootstrap-material-design/dist/css/bootstrap-material-design.min.css",
        "/bootstrap-material-design/dist/css/ripples.min.css",
        "/angular-ui-bootstrap/dist/ui-bootstrap-csp.css",
        "/angular-bootstrap-colorpicker/css/colorpicker.min.css",
        "/angular-loading-bar/src/loading-bar.css",
        "/jquery-confirm/css/jquery-confirm.css",
        "/pnotify/dist/pnotify.css",
        "/pnotify/dist/pnotify.brighttheme.css"
    ], 'public/css/dependencies.css', 'node_modules')
    .sass('app.scss');

    mix.browserSync({
        proxy: 'trello.dev'
    });
});
