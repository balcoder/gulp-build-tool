# Gulp Build Tool
### Updated to gulp4 23/12/2019

A collection of packages that build a website using `npm and gulp scripts`.

* [NPM Packages used](#packages-used)
* [Running tasks individually](#running-tasks-individually)
* [Development](#development)
* [Production](#production)
* [Using in your project](#using-in-your-project)
* [List of available tasks](#list-of-available-tasks)


## Packages used  
  * [autoprefixer](https://github.com/postcss/autoprefixer)
  * [browser-sync](https://github.com/Browsersync/browser-sync)  
  * [gulp](https://github.com/gulpjs/gulp)
  * [gulp-if](https://github.com/robrich/gulp-if)
  * [gulp-postcss](https://github.com/postcss/gulp-postcss)
  * [gulp-sass](https://github.com/dlmanning/gulp-sass)
  * [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
  * [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)
  * [gulp-uglify](https://github.com/terinjokes/gulp-uglify)
  * [gulp-useref](https://github.com/jonkemp/gulp-useref)


## Running tasks individually
* Make sure you have Node and Npm installed on your machine , [go here](https://nodejs.org/en/download/package-manager/)
* From the terminal cd into your project directory and run  `npm install` to install all the dependencies in the package.json
  file.
* Then you can run any of the scripts from the gulpfile.js by running `gulp script-name`, for example `gulp.task('autoprefixer', function()....` can be run by typing `gulp autoprefixer`.

## Development
The most frequently used script would be `gulp` which runs  `gulp default` which runs sass and browserSync server first before  watching for changes in scss, js,and html files in the app folder. Once a change is detected in app/scss the sass task is called and the scss files are converted to css and browser
reloaded. If a html or js file is changed the browser is reloaded.

## Production
For production ready code we run `gulp build` which empties the dist folder and
runs sass task in sequence first, once these complete it runs tasks useref,
images and fonts all simultaneously.

## List of available tasks
### `gulp browserSync`

start the development server

### `gulp sass`

convert all scss files to css and reload browser

### `gulp watch`

watches for changes in scss and runs the sass task above, watches for changes in
html and js files and relaods the browser.

### `gulp useref`

minifies and concatenates js files stated in app/index.html starting from `<!--build:js js/main.min.js -->`and ending in `<!-- endbuild -->` with all files
in between getting minified and concatenated into js/main.min.js

 It also minifies and concatenates css files stated in app/index.html starting from `<!--build:css css/css.min.css -->` and ending in ` <!-- endbuild -->` with all files in between getting minified and concatenated into css/css.min.js

### `gulp autoprefixer`

add prefixes and sourcemaps to css and save to dist/css

### `gulp images`

optimize images and save to dist/images  while caching so we don't repeat unnecessarily

### `gulp fonts`

copy fonts to dist/fonts

### `gulp clean`

delete files and folders in dist and clear the cached images

### `gulp clean:dist`

clean dist without cleaning Images

### `gulp default`

run tasks sass and browserSync first and then the watch task

### `gulp build`

for production run tasks clean:dist, sass and autoprefixer in sequence first and then run useref
, images and fonts tasks together

## Credit
Thanks to  ZELL LIEW for his blog post on [gulp for beginners](https://css-tricks.com/gulp-for-beginners/)
