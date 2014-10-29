<?php

class Account extends Eloquent {

	protected $table = 'Accounts';

	public function apps()
    {
        return $this->hasMany('Apps');
    }

}