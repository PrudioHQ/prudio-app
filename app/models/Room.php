<?php

class Room extends Eloquent {

	protected $table = 'Rooms';

	public function app()
    {
        return $this->belongsTo('Apps');
    }

}