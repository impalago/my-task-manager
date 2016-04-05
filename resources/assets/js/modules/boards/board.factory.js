'use strict';

/* @ngInject */
angular
    .module('app')
    .factory('BoardsFactory', BoardsFactory );

function BoardsFactory($http) {

    var board = this;
    this.boardList = {};

    board.getBoards = getBoards;
    board.createBoard = createBoard;
    board.editBoard = editBoard;
    board.updateBoard = updateBoard;
    board.deleteBoard = deleteBoard;

    return board;

    function getBoards() {
        return $http.get('/api/boards')
            .then(function(rec) {
                board.boardList = rec.data;
                return rec.data;
            });
    }

    function createBoard(board) {
        return $http.post('/api/boards', board);
    }

    function editBoard(id) {
        return $http.get('/api/boards/' + id + '/edit')
            .then(function(rec) {
                return rec.data;
            });
    }

    function updateBoard(id, board) {
        return $http.put('/api/boards/' + id, board);
    }

    function deleteBoard(id) {
        return $http.delete('/api/boards/' + id)
    }
}