'use strict';

/* @ngInject */
angular
    .module('app')
    .component('cardList', {
        templateUrl: '/js/modules/card-list/card-list.tpl.html',
        controller: cardListCtrl
    });
