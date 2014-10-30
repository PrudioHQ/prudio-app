@extends('_layout.dashboard')

@section('content')

	<h1>{{ $app->name }}</h1>

	<p>
        First of all you need to create a dedicated user in Slack.
    </p>
    
    {{ link_to('dashboard/auth', 'Auth Slack', array('class' => 'pure-button pure-button-primary')) }}

@stop