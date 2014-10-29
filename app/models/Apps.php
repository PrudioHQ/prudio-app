<?php

class Apps extends Eloquent {

	protected $table = 'apps';

	public function account()
    {
        return $this->belongsTo('Account');
    }

    public function room()
    {
        return $this->hasOne('Room');
    }

}