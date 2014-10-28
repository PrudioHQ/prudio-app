<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('Rooms', function($table)
		{
			$table->bigIncrements('id');
			$table->bigInteger('account_id')->unsigned()->references('id')->on('Accounts');
			$table->bigInteger('app_id')->unsigned()->references('id')->on('Apps');
			$table->bigInteger('count')->default(1);
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
		Schema::drop('Rooms');
	}

}
