<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{{ isset($title) ? $title : 'Prud.io' }}</title>
</head>

<body>
	@yield('content')
</body>
</html>