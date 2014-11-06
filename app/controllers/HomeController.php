<?php

class HomeController extends BaseController {

	public function __construct()
    {
		parent::__construct();
    }

	public function showWelcome()
	{
		return View::make('welcome');
	}

	public function doLogout()
	{
		Auth::logout();

		return Redirect::to('/');
	}

	public function showSignin()
	{
		return View::make('signin');
	}

	public function doSignin()
	{
		if (Auth::attempt(array('email' => Input::get('email'), 'password' => Input::get('password'))))
		{
			return Redirect::intended('dashboard');
		}

		return Redirect::back()->withErrors('E-mail and/or password did not match in our system.');
	}

	public function showSignup()
	{
		return View::make('signup');
	}

	public function doSignup()
	{
		$validator = Validator::make(
			Input::all(),
			array(
				'name'     => 'required|min:3',
				'email'    => 'required|email|unique:users',
		        'password' => 'required|min:6',
			)
		);

		if ($validator->fails())
		{
			//dd($validator->messages());
			return Redirect::back()->withErrors($validator);
		}

		$account = new Account;
		$account->name = Input::get('name');
		$account->save();


		$user = new User;
		$user->account_id = $account->id;
		$user->fname = Input::get('name'); 
		$user->email = Input::get('email'); 
		$user->password = Input::get('password');
		$user->save();

		Auth::loginUsingId($user->id);

		return Redirect::to('/dashboard');
	}

}
