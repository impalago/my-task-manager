/* @ngInject */

angular
    .module('app', [
        'ui.router',
        'ui.bootstrap',
        'colorpicker.module',
        'chieffancypants.loadingBar',
        'ngAnimate',
        'angular-sortable-view'
    ])
    .config(["cfpLoadingBarProvider", function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    }]);
'use strict';

/* @ngInject */
angular
    .module('app')
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('boards', {
                url: "/boards",
                templateProvider: ["$templateCache", function($templateCache){
                    return $templateCache.get('modules/boards/boards.tpl.html');
                }],
                controller: "BoardsController"
            })

            .state('board-item', {
                url: "/boards/:id",
                templateProvider: ["$templateCache", function($templateCache){
                    return $templateCache.get('modules/boards/board-item/board-item.tpl.html');
                }],
                controller: "BoardItemCtrl"
            });

    }]);


/**
 *  Initialize the material design
 */
$.material.init();
angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("modules/boards/boards.tpl.html","<div class=\"container-fluid fadein fadeout\" ng-hide=\"fakeIntro\">\n    <div class=\"row\">\n        <div class=\"col-md-10 col-md-offset-1\">\n\n            <div class=\"page-header\">\n                <h1>Boards</h1>\n            </div>\n\n            <div id=\"board_list\" class=\"container-fluid\">\n\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <button type=\"button\" class=\"btn btn-raised btn-success btn-lg\" ng-click=\"createBoard()\">Create new board ...</button>\n                    </div>\n                </div>\n\n                <div class=\"row\">\n                    <div class=\"col-md-4 col-lg-3 board-item\" ng-repeat=\"board in boards\">\n                        <div class=\"alert alert-dismissible alert-success\" >\n                            <button type=\"button\" class=\"board-item__update\" ng-click=\"editBoard(board.id)\"><i class=\"material-icons\">create</i></button>\n                            <button type=\"button\" class=\"confirm board-item__cart\" ng-click=\"deleteBoard(board.id)\"><i class=\"material-icons\">delete</i></button>\n                            <div class=\"panel-heading board-item__title\">{{ board.name }} </div>\n                            <a data-ng-href=\"#/boards/{{ board.id }}\"></a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>");
$templateCache.put("modules/boards/create-board-form.tpl.html","<form name=\"boardForm\">\n    <div class=\"modal-header\">\n        <h3 class=\"modal-title\">{{ formTitle }}</h3>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"form-group\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Name\" data-ng-model=\"board.name\" ng-value=\"boardName\" required autofocus>\n        </div>\n    </div>\n\n    <div class=\"modal-footer\">\n        <button class=\"btn btn-raised btn-success\" type=\"submit\" ng-click=\"boardSubmit()\">Save</button>\n        <button class=\"btn btn-raised btn-warning\" type=\"button\" ng-click=\"cancel()\">Cancel</button>\n    </div>\n</form>");
$templateCache.put("modules/card-list/card-list.tpl.html","<div class=\"row\">\n    <div class=\"col-md-12\">\n        <button type=\"button\" class=\"btn btn-raised btn-success btn-lg\" data-ng-click=\"createCardList()\">Create new card list ...</button>\n    </div>\n</div>\n<div class=\"row sortable-container\" sv-root sv-part=\"allCardList\">\n    <div class=\"col-md-3 card-list-item\"\n         data-ng-repeat=\"cardList in allCardList\"\n         data-card-list-id=\"{{ cardList.id }}\"\n         sv-element>\n\n        <div class=\"panel panel-default\" style=\"box-shadow: 0 1px 6px {{ cardList.color == \"\" ? \"\" : cardList.color }}\">\n            <div class=\"panel-heading\" style=\"background-color: {{ cardList.color == \"\" ? \"\" : cardList.color }}\">\n                {{ cardList.name }}\n                <i sv-handle class=\"material-icons move\">games</i>\n                <button type=\"button\"\n                        class=\"card-list-item__update\"\n                        data-ng-click=\"editCardList(cardList.id)\"><i class=\"material-icons\">create</i></button>\n                <button type=\"button\"\n                        class=\"confirm card-list-item__delete\"\n                        data-ng-click=\"deleteCardList(cardList.id)\"><i class=\"material-icons\">delete</i></button>\n\n            </div>\n            <div class=\"panel-body\">\n\n\n\n            </div>\n\n            <!--<div class=\"panel-footer\"-->\n                 <!--data-ng-controller=\"cardCtrl as cardCtrl\"-->\n                 <!--data-ng-click=\"cardCtrl.createCard(cardList.id)\">-->\n                <!--Add new card...-->\n            <!--</div>-->\n        </div>\n\n    </div>\n</div>");
$templateCache.put("modules/boards/board-item/board-item.tpl.html","<div class=\"container-fluid cardList fadein fadeout\"\n     data-ng-hide=\"fakeIntro\"\n     data-ng-controller=\"cardListCtrl as cardListCtrl\"\n     ng-cloak>\n    <div class=\"row\">\n        <div class=\"col-md-10 col-md-offset-1\">\n\n            <div class=\"page-header\">\n                <h1>{{ pageName }}</h1>\n            </div>\n\n            <card-list></card-list>\n        </div>\n    </div>\n</div>\n");}]);
'use strict';

/* @ngInject */
BoardsFactory.$inject = ["$http"];
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
'use strict';

/* @ngInject */
BoardsController.$inject = ["$scope", "BoardsFactory", "$uibModal", "cfpLoadingBar", "$templateCache"];
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
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    }

    function editBoard(id) {
        var modalInstance = $uibModal.open({
            template: $templateCache.get("modules/boards/create-board-form.tpl.html"),
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
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
'use strict';

/* @ngInject */
angular
    .module('app')
    .component('cardList', {
        templateUrl: '/js/modules/card-list/card-list.tpl.html',
        controller: cardListCtrl
    });

'use strict';

/* @ngInject */
cardListCtrl.$inject = ["$scope", "$uibModal", "$stateParams", "cardListFactory", "cfpLoadingBar"];
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
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
        });

        modalInstance.result.then(function() {
            $scope.cardList();
        });
    }

    function editCardList(id) {
        var modalInstance = $uibModal.open({
            templateUrl: '/api/card-list-create-form',
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
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
'use strict';

/* @ngInject */
cardListFactory.$inject = ["$http", "$stateParams"];
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
/* @ngInject */

angular.module('app').controller('cardCtrl', ["$scope", "cardFactory", "$uibModal", "cfpLoadingBar", function($scope, cardFactory, $uibModal, cfpLoadingBar) {

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
            controller: ["$scope", "$uibModalInstance", function($scope, $uibModalInstance) {
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
            }]
        });

        modalInstance.result.then(function() {
            $scope.allBoards();
        });
    };

    $scope.init();
}]);
/* @ngInject */

angular.module('app').factory('cardFactory', ["$http", function($http) {

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
}]);
'use strict';

/* @ngInject */
BoardItemCtrl.$inject = ["$scope", "$stateParams", "BoardItemFactory"];
angular
    .module('app')
    .controller('BoardItemCtrl', BoardItemCtrl);

function BoardItemCtrl($scope, $stateParams, BoardItemFactory) {
    BoardItemFactory.getBoardInfo($stateParams.id)
        .then(function(rec) {
            $scope.pageName = rec.name;
        });
}

'use strict';

/* @ngInject */
BoardItemFactory.$inject = ["$http"];
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