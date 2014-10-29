<?php

use OAuth2\OAuth2;
use OAuth2\Token_Access;
use OAuth2\Exception as OAuth2_Exception;

class DashboardController extends BaseController {

	public function __construct()
    {
        $this->beforeFilter('auth');
    }

	public function getIndex()
	{
		$user    = Auth::user();
		$account = $user->account;
		$apps    = $account->apps;

		return View::make('dashboard.index')
		->with('user',    $user)
		->with('account', $account)
		->with('apps',    $apps);
	}

	public function getNew()
	{
		$user    = Auth::user();
		$account = $user->account;
		$apps    = $account->apps;

		return View::make('dashboard.new')
		->with('user',    $user)
		->with('account', $account)
		->with('apps',    $apps);
	}

	public function getSettings()
	{
		$user    = Auth::user();
		$account = $user->account;
		$apps    = $account->apps;

		return View::make('dashboard.settings')
		->with('user',    $user)
		->with('account', $account)
		->with('apps',    $apps);
	}

	public function getAuth() 
	{
		$provider = OAuth2::provider('slack', array(
			'id' 	 => '2193712768.2799236381',
			'secret' => '91c9dbdc924dc682ee0ae6096b49d221',
		));

		if ( ! Input::has('code'))
		{
			// By sending no options it'll come back here
			return $provider->authorize(array('scope' => 'identify,read,post,client'));
		}
		else
		{
			// Howzit?
			try
			{
				$params = $provider->access(Input::get('code'));

				$token = new Token_Access(array(
					'access_token' => $params->access_token
				));
				
				// Here you should use this information to A) look for a user B) help a new user sign up with existing data.
				// If you store it all in a cookie and redirect to a registration page this is crazy-simple.

				var_dump($token);

				//return Redirect::to('dashboard');
			}

			catch (OAuth2_Exception $e)
			{
				return Redirect::to('dashboard/auth-error');
			}
		}
	}



}
