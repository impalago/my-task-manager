/* @ngInject */

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'colorpicker.module',
        'chieffancypants.loadingBar',
        'ngAnimate',
        'angular-sortable-view'
    ])
    .config(function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    });