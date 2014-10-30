<?php

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		// $this->call('UserTableSeeder');

		$account = Account::create(array('name' => 'Seeder account'));
		$user    = User::create(array('account_id' => $account->id, 'fname' => 'Hélder', 'email' => 'cossou@gmail.com', 'password' => '123456'));
		$app	 = Apps::create(array('account_id' => $account->id, 'user_id' => $user->id, 'token' => '77475a1d-d347-4514-b0b3-1f01c1a205ea', 'name' => 'My Seeder App', 'active' => true, 'online' => true, 'slack_api_token' => 'xoxp-2193712768-2803840916-2878351772-f61214', 'slack_invite_user' => 'U025PLYNN', 'room_count' => 1, 'room_prefix' => 'lc-'));

	}

}
