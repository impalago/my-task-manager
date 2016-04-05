/* @ngInject */

angular.module('app').factory('cardFactory', function($http) {

    var card = {};

    card.getCards = function(cardListId) {
        return $http.get('/api/card', {
                params: {
                    cardListId: cardListId
                }
            })
            .then(function(rec) {
                return rec.data;
            });
    };

    card.createCard = function(card) {
        return $http.post('/api/card', card);
    };

    return card;
});