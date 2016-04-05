'use strict';

/* @ngInject */
angular
    .module('app')
    .controller('BoardItemCtrl', BoardItemCtrl);

function BoardItemCtrl($scope, $stateParams, BoardItemFactory) {
    BoardItemFactory.getBoardInfo($stateParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });
}
