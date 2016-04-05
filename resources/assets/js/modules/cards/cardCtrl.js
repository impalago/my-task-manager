/* @ngInject */

angular.module('app').controller('cardCtrl', function($scope, cardFactory, $uibModal, cfpLoadingBar) {

    $self = this;

    $scope.init = function() {
        $scope.getCards();
    };

    var cardListId = $('.card-list-item').data('card-list-id');

    $scope.getCards = function() {

        cardFactory.getCards()
            .then(function(rec) {
                console.log(rec)
            });
    };

    $self.createCard = function(cardListId) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-create-form',
            controller: function($scope, $uibModalInstance) {
                $scope.formTitle = 'Create card';
                $scope.cardCreateSubmit = function() {
                    if($scope.cardCreateForm.$valid) {
                        $scope.cardFields.cardListId = cardListId;
                        cardFactory.createCard($scope.cardFields)
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
    };

    $scope.init();
});