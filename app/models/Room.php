<?php

class Room extends Eloquent {

	protected $table = 'rooms';

	public function app()
    {
        return $this->belongsTo('Apps');
    }

}