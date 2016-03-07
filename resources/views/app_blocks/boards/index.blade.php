<div class="container-fluid">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">

            <div class="page-header">
                <h1>Boards</h1>
            </div>

            <div id="board_list" class="container-fluid">

                <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-raised btn-success btn-lg" data-ng-click="createBoard()">Create new board ...</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-lg-3 board-item"  data-ng-repeat="board in boards">
                        <div class="alert alert-dismissible alert-success" >
                            <button type="button" class="board-item__update" data-ng-click="editBoard(board.id)"><i class="material-icons">create</i></button>
                            <button type="button" class="confirm board-item__cart" data-ng-click="deleteBoard(board.id)"><i class="material-icons">delete</i></button>
                            <div class="panel-heading board-item__title">@{{ board.name }} </div>
                            <a data-ng-href="#/boards/@{{ board.id }}"></a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

