<?php


Route::get('/', function () {
    return view('welcome');
});

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => 'web'], function () {
    Route::auth();
});

Route::group(['middleware' => ['web', 'auth']], function () {
    Route::get('/', 'HomeController@index');
});

Route::group(['middleware' => ['web', 'auth'], 'prefix' => 'api'], function () {
    Route::resource('boards', 'BoardsController', ['except' => [
        'create'
    ]]);

    Route::resource('card-list', 'CardListController', ['except' => [
        'create'
    ]]);
    Route::post('card-list-sorting', 'CardListController@cardListSorting');

    Route::resource('card', 'CardsController', ['except' => [
        'create'
    ]]);

    // Templates

    // Card list
    Route::get('card-list-create-form', function() {
        return view('app_blocks/card-list.card-list-form');
    });

    //Card
    Route::get('card-create-form', function() {
        return view('app_blocks/card.card-create-form');
    });

});
