let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

 // The below code will inject i18n Kazupon/vue-18-loader as a loader for .vue files.
 mix.extend( 'i18n', function( webpackConfig, ...args ) {
     webpackConfig.module.rules.forEach( ( module ) => {
         if( module.loader !== 'vue-loader' )
             return;
         module.options.loaders.i18n = '@kazupon/vue-i18n-loader';
     } );
 } );

mix.webpackConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/assets/application/'),
    }
  },
});

mix.i18n().js('resources/assets/application/app.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css');
