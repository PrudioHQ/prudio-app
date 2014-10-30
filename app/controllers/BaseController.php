<?php

class BaseController extends Controller {


	public function __construct() {
		if(Auth::check())
		{
			$user    = Auth::user();
			$account = $user->account;
			$apps    = $account->apps;

            View::share(
            	array(
            		'user'    => $user, 
            		'account' => $account, 
            		'apps'    => $apps
            	)
            );
		}
	}

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout()
	{
		if ( ! is_null($this->layout))
		{
			$this->layout = View::make($this->layout);
		}
	}

}
