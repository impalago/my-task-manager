'use strict';

/* @ngInject */
angular
    .module('app')
    .controller('BoardsController', BoardsController);

function BoardsController($scope, BoardsFactory, $uibModal, cfpLoadingBar, $templateCache) {

    $scope.allBoards = allBoards;
    $scope.createBoard = createBoard;
    $scope.editBoard = editBoard;
    $scope.deleteBoard = deleteBoard;

    activate();

    function activate() {
        allBoards();

        $scope.loadStart = function() {
            cfpLoadingBar.start();
        };

        $scope.loadComplete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loadStart();
        $scope.fakeIntro = true;
    }

    function allBoards() {
        BoardsFactory.getBoards()
            .then(function(rec) {
                $scope.boards = BoardsFactory.boardList;
                $scope.loadComplete();
                $scope.fakeIntro = false;
            });
    }

    function createBoard() {
        var modalInstance = $uibModal.open({
            template: $templateCache.get("modules/boards/create-board-form.tpl.html"),
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create board';
                $scope.boardSubmit = function() {
                    if($scope.boardForm.$valid) {
                        BoardsFactory.createBoard($scope.board)
                            .then(function() {
                                $uibModalInstance.close();
                            });
                    }
                };
                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    }

    function editBoard(id) {
        var modalInstance = $uibModal.open({
            template: $templateCache.get("modules/boards/create-board-form.tpl.html"),
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Edit board';
                BoardsFactory.editBoard(id)
                    .then(function(rec) {

                        $scope.boardName = rec.name;
                        $scope.boardSubmit = function() {
                            if($scope.boardForm.$valid) {
                                BoardsFactory.updateBoard(id, $scope.board)
                                    .then(function() {
                                        $uibModalInstance.close();
                                    });
                            }
                        };

                    });

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    }

    function deleteBoard(id) {
        $.confirm({
            title: 'Are you sure?',
            content: 'The board to move to a basket!',
            confirm: function(){
                BoardsFactory.deleteBoard(id)
                    .then(function(rec) {
                        new PNotify({
                            title: 'Info',
                            text: 'Board successfully removed',
                            type: 'info',
                            delay: 3000
                        });
                        $scope.allBoards();
                    });
            }
        });
    }
}