<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('Users', function($table)
		{
			$table->bigIncrements('id');
			$table->bigInteger('account_id')->unsigned()->references('id')->on('Accounts');
			$table->string('fname');
			$table->string('lname')->default('');
			$table->string('email')->unique();
			$table->string('password');

			$table->timestamps();
			$table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('Users');
	}

}
