'use strict';

/* @ngInject */
angular
    .module('app')
    .controller('cardListCtrl', cardListCtrl);

function cardListCtrl($scope, $uibModal, $stateParams, cardListFactory, cfpLoadingBar) {

    $scope.cardList = cardList;
    $scope.createCardList = createCardList;
    $scope.editCardList = editCardList;
    $scope.deleteCardList = deleteCardList;

    activate();

    function activate() {
        $scope.cardList();

        $scope.loadStart = function() {
            cfpLoadingBar.start();
        };

        $scope.loadComplete = function () {
            cfpLoadingBar.complete();
        };

        $scope.loadStart();
        $scope.fakeIntro = true;
    }

    $scope.$watchCollection('allCardList', function(newArr, oldArr) {
        cardListFactory.watchAllCardList(newArr);
    });

    function cardList() {
        cardListFactory.getAllCardList()
            .then(function(rec) {
                $scope.allCardList = rec;
                $scope.loadComplete();
                $scope.fakeIntro = false;
            });
    }

    function createCardList() {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create card listqqqqqq';
                $scope.cardListSubmit = function() {
                    if($scope.cardListForm.$valid) {
                        $scope.cardListFields.board_id = $stateParams.id;
                        cardListFactory.createCardList($scope.cardListFields)
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
            $scope.cardList();
        });
    }

    function editCardList(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Edit card list';
                cardListFactory.editCardList(id)
                    .then(function(rec) {
                        $scope.cardListFields = { name: '', color: '' };
                        $scope.cardListName = rec.name;
                        $scope.colorcardListColor = rec.color;
                        $scope.cardListSubmit = function() {
                            if($scope.cardListFields.name != rec.name || $scope.cardListFields.color) {
                                $scope.cardListFields.board_id = $stateParams.id;
                                $scope.cardListFields.name = !$scope.cardListFields.name ? rec.name : $scope.cardListFields.name;
                                $scope.cardListFields.color = !$scope.cardListFields.color ? rec.color : $scope.cardListFields.color;
                                cardListFactory.updateCardList(id, $scope.cardListFields)
                                    .then(function() {
                                        modalInstance.close();
                                    });
                            } else {
                                $uibModalInstance.dismiss('cancel');
                            }
                        };

                    });

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        });

        modalInstance.result.then(function() {
            $scope.cardList();
        });
    }

    function deleteCardList(id) {
        $.confirm({
            title: 'Are you sure?',
            confirm: function(){
                cardListFactory.deleteCardList(id)
                    .then(function(rec) {
                        new PNotify({
                            title: 'Info',
                            text: 'List of cards successfully removed',
                            type: 'info',
                            delay: 3000
                        });
                        $scope.cardList();
                    });
            }
        });
    }


}