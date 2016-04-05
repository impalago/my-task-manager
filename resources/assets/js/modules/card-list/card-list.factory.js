'use strict';

/* @ngInject */
angular
    .module('app')
    .factory('cardListFactory', cardListFactory);

function cardListFactory($http, $stateParams) {
    var cardList = {};

    cardList.getAllCardList = getAllCardList;
    cardList.watchAllCardList = watchAllCardList;
    cardList.createCardList = createCardList;
    cardList.editCardList = editCardList;
    cardList.updateCardList = updateCardList;
    cardList.deleteCardList = deleteCardList;

    return cardList;

    function getAllCardList() {
        return $http.get('/api/card-list', {
                params: {
                    board_id: $stateParams.id
                }
            })
            .then(function (rec) {
                return rec.data;
            });
    }

    function watchAllCardList(newArr) {
        return $http.post('/api/card-list-sorting', newArr)
            .then(function(rec) {
                return rec.data;
            });
    }

    function createCardList(cardList) {
        return $http.post('/api/card-list', cardList);
    }

    function editCardList(id) {
        return $http.get('/api/card-list/' + id + '/edit')
            .then(function(rec) {
                return rec.data;
            });
    }

    function updateCardList(id, cardList) {
        return $http.put('/api/card-list/' + id, cardList)
    }

    function deleteCardList(id) {
        return $http.delete('/api/card-list/' + id)
    }
}