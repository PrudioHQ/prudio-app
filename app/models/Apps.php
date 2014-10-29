<?php

class Apps extends Eloquent {

	protected $table = 'Apps';

	public function account()
    {
        return $this->belongsTo('Account');
    }

    public function room()
    {
        return $this->hasOne('Room');
    }

}