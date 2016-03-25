<form name="boardForm">
    <div class="modal-header">
        <h3 class="modal-title">@{{ formTitle }}</h3>
    </div>
    <div class="modal-body">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Name" data-ng-model="board.name" ng-value="boardName" required autofocus>
        </div>
    </div>

    <div class="modal-footer">
        <button class="btn btn-raised btn-success" type="submit" ng-click="boardSubmit()">Save</button>
        <button class="btn btn-raised btn-warning" type="button" ng-click="cancel()">Cancel</button>
    </div>
</form>