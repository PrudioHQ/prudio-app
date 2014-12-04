@extends('_layout.blank')

@section('content')

	<div class="logo">
		<img src="/images/logo-beta.png" alt="Prudio">
	</div>
	
	<div class="content">
		<h1>Welcome to Prudio</h1>
		<p>
			We are still building Prudio. 
			<br>
			Want to <a href="https://assembly.com/prudio" target="_blank">join the team</a>?
			<br>
			<br>
			<a href="mailto:hello@prud.io">hello@prud.io</a>
		</p>
	</div>

	<div class="this-is-prudio">
		<img src="/images/this-is-prudio.png" alt="Check it!">
	</div>
	
@stop

@section('prudio-js')
	
	<!-- This is where PRUDIO starts --> 
	<script src="http://chat.prud.io/client.js?appid=77475a1d-d347-4514-b0b3-1f01c1a205ea" async></script>
    <script>

    	// This is optional 
    	// and there are more options available!

        window._PrudioSettings = {
        	title: 'Prudio'
        };

    </script>
    <!-- Yep... just this! THE END! -->

@stop