<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>{{ isset($title) ? $title : 'Prud.io' }}</title>
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link href="favicon.ico" rel="shortcut icon" type="image/vnd.microsoft.icon" />
        <link rel="stylesheet" href="/css/welcome.css">
        <link href="http://fonts.googleapis.com/css?family=Quicksand:300,400,700" rel="stylesheet" type="text/css">
    </head>
    <body>
        
        @yield('content')

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        @yield('prudio-js')

    </body>
</html>
