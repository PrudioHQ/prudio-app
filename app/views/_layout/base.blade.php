<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ isset($title) ? $title : 'Prud.io' }}</title>

    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
    <!--[if gt IE 8]><!-->
    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css">
	<!--<![endif]-->
	<!--[if lt IE 9]>
	    <script src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
	<![endif]-->
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
	@include('_layout.top-menu')
    @yield('content')

    <script src="http://chat.prud.io/client.js?token=77475a1d-d347-4514-b0b3-1f01c1a205ea" async></script>
    <script>

        window._PrudioSettings = {
          title: 'Pickle Films Support',
          name:  'Hélder Duarte',
          email: 'helder.duarte@sto.ad',
        };

    </script>
</body>
</html>