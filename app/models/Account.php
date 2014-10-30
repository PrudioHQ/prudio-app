<?php

class Account extends Eloquent {

	protected $table = 'accounts';

	public function apps()
    {
        return $this->hasMany('Apps');
    }

    public function app($id)
    {
        return $this->hasMany('Apps')->first();
    }
}