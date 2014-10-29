<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/',        'HomeController@showWelcome');

Route::any( '/logout', 'HomeController@doLogout');

Route::get( '/signin', 'HomeController@showSignin');
Route::post('/signin', 'HomeController@doSignin');

Route::get( '/signup', 'HomeController@showSignup');
Route::post('/signup', 'HomeController@doSignup');

Route::controller('dashboard', 'DashboardController');
