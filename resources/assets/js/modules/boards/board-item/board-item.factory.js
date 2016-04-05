'use strict';

/* @ngInject */
angular
    .module('app')
    .factory('BoardItemFactory', BoardItemFactory);

function BoardItemFactory($http) {

    var board = this;
    board.getBoardInfo = getBoardInfo;

    function getBoardInfo(id) {
        return $http.get('/api/boards/' + id)
            .then(function(rec) {
                return rec.data;
            });
    }

    return board;
}