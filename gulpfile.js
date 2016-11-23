var gulp = require("gulp");
var changed = require("gulp-changed");
var browserSync = require("browser-sync");
var stream = require("merge-stream");

var distPath = "./docs";
var devPath = "./_dev";
var cssPath = "/css";
var jsPath = "/js";
var fontPath = "/fonts";

var cssFiles = [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "node_modules/select2/dist/css/select2.min.css",
  "node_modules/select2-bootstrap-theme/dist/select2-bootstrap.min.css",
];

var jsFiles = [
  "node_modules/jquery/dist/jquery.min.*(js|map)",
  "node_modules/bootstrap/dist/js/bootstrap.min.js",
  "node_modules/select2/dist/js/select2.full.min.js",
  "node_modules/form_to_object/dist/formToObject.min.js",
  "node_modules/yamljs/dist/yaml.min.js",
  "node_modules/file-saver/FileSaver.min.js",
  "node_modules/ajv/dist/ajv.min.js"
];

var fontFiles = [
  "node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.*"
];

var siteFiles = [ "src/**", "src/.*" ];

gulp.task("build", function () {
  var css = gulp.src(cssFiles).pipe(gulp.dest(distPath + cssPath));
  var js = gulp.src(jsFiles).pipe(gulp.dest(distPath + jsPath));
  var fonts = gulp.src(fontFiles).pipe(gulp.dest(distPath + fontPath));
  var site = gulp.src(siteFiles).pipe(gulp.dest(distPath));
  return stream(css, js, fonts, site);
});

gulp.task("watch-dev", function () {
  gulp.watch([cssFiles, jsFiles, fontFiles, siteFiles], function () {
    var css = gulp.src(cssFiles).pipe(changed(devPath + cssPath)).pipe(gulp.dest(devPath + cssPath)).pipe(browserSync.stream());
    var js = gulp.src(jsFiles).pipe(changed(devPath + jsPath)).pipe(gulp.dest(devPath + jsPath)).pipe(browserSync.stream());
    var fonts = gulp.src(fontFiles).pipe(changed(devPath + fontPath)).pipe(gulp.dest(devPath + fontPath)).pipe(browserSync.stream());
    var site = gulp.src(siteFiles).pipe(changed(devPath)).pipe(gulp.dest(devPath)).pipe(browserSync.stream());
    return stream(css, js, fonts, site);
  });
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "_dev"
    }
  });
});

gulp.task("dev", ["watch-dev", "browser-sync"]);

gulp.task("default", ["dev"]);
