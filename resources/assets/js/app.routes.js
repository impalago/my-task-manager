'use strict';

/* @ngInject */
angular
    .module('app')
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('boards', {
                url: "/boards",
                templateProvider: function($templateCache){
                    return $templateCache.get('modules/boards/boards.tpl.html');
                },
                controller: "BoardsController"
            })

            .state('board-item', {
                url: "/boards/:id",
                templateProvider: function($templateCache){
                    return $templateCache.get('modules/boards/board-item/board-item.tpl.html');
                },
                controller: "BoardItemCtrl"
            });

    });

