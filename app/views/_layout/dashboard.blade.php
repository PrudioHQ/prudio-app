
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A layout example that shows off a responsive email layout.">

    <title>Prud.io - Dashboard</title>

    <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
    <!--[if gt IE 8]><!-->
        <link rel="stylesheet" href="/css/dashboard.css">
    <!--<![endif]-->
    <!--[if lt IE 9]>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7/html5shiv.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.css">

</head>
<body>

<div id="layout" class="content pure-g">
    <div id="nav" class="pure-u">
        <a href="#" class="nav-menu-button"><i class="fa fa-bars"></i></a>

        <div class="nav-inner">
            <!--button class="primary-button pure-button">Compose</button-->
            <H3>DASHBOARD <span class="beta">beta</span></H3>

            <div class="pure-menu pure-menu-open">
                <ul>
                    <li class="pure-menu-heading">Apps</li>
                    @foreach($apps as $app)
                    <li>{{ link_to('dashboard/' . $app->id, $app->name) }}</li>
                    @endforeach
                    @if(count($apps) == 0)
                    <li>{{ link_to('dashboard/new', 'Create a new app') }}</li>
                    @endif

                    <li class="pure-menu-heading">Account</li>
                    <li>{{ link_to('dashboard/settings', 'Settings') }}</li>
                    <li>{{ link_to('logout', 'Logout') }}</li>
                    
                    <li class="pure-menu-heading">Help </li>
                    <li><a href="#">Adding to my site</a></li>
                    <li><a href="#">Making it safe</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Troubleshooting</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div id="main" class="pure-u-1">
        <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2"></div>

                <div class="email-content-controls pure-u-1-2">
                    <div class="pure-u">
                        <h5 class="email-name">{{ Auth::user()->fname }} <a title="Sign Out" href="/logout"><i class="fa fa-sign-out"></i></a></h5>
                        <img class="email-avatar" alt="Tilo Mitra's avatar" height="64" width="64" src="http://purecss.io/img/common/tilo-avatar.png">
                    </div>
                </div>
            </div>

            <div class="email-content-body">
                @yield('content')
            </div>
        </div>
    </div>
</div>

<script src="http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js"></script>

<script>
    YUI().use('node-base', 'node-event-delegate', function (Y) {

        var menuButton = Y.one('.nav-menu-button'),
            nav        = Y.one('#nav');

        // Setting the active class name expands the menu vertically on small screens.
        menuButton.on('click', function (e) {
            nav.toggleClass('active');
        });

        // Your application code goes here...

    });
</script>


<script>
(function (root) {
// -- Data --
root.YUI_config = {"version":"3.17.2","base":"http:\u002F\u002Fyui.yahooapis.com\u002F3.17.2\u002F","comboBase":"http:\u002F\u002Fyui.yahooapis.com\u002Fcombo?","comboSep":"&","root":"3.17.2\u002F","filter":"min","logLevel":"error","combine":true,"patches":[],"maxURLLength":2048,"groups":{"vendor":{"combine":true,"comboBase":"\u002Fcombo\u002F1.17.16?","base":"\u002F","root":"\u002F","modules":{"css-mediaquery":{"path":"vendor\u002Fcss-mediaquery.js"},"handlebars-runtime":{"path":"vendor\u002Fhandlebars.runtime.js"}}},"app":{"combine":true,"comboBase":"\u002Fcombo\u002F1.17.16?","base":"\u002Fjs\u002F","root":"\u002Fjs\u002F"}}};
root.app || (root.app = {});
root.app.yui = {"use":function () { return this._bootstrap('use', [].slice.call(arguments)); },"require":function () { this._bootstrap('require', [].slice.call(arguments)); },"ready":function (callback) { this.use(function () { callback(); }); },"_bootstrap":function bootstrap(method, args) { var self = this, d = document, head = d.getElementsByTagName('head')[0], ie = /MSIE/.test(navigator.userAgent), callback = [], config = typeof YUI_config != "undefined" ? YUI_config : {}; function flush() { var l = callback.length, i; if (!self.YUI && typeof YUI == "undefined") { throw new Error("YUI was not injected correctly!"); } self.YUI = self.YUI || YUI; for (i = 0; i < l; i++) { callback.shift()(); } } function decrementRequestPending() { self._pending--; if (self._pending <= 0) { setTimeout(flush, 0); } else { load(); } } function createScriptNode(src) { var node = d.createElement('script'); if (node.async) { node.async = false; } if (ie) { node.onreadystatechange = function () { if (/loaded|complete/.test(this.readyState)) { this.onreadystatechange = null; decrementRequestPending(); } }; } else { node.onload = node.onerror = decrementRequestPending; } node.setAttribute('src', src); return node; } function load() { if (!config.seed) { throw new Error('YUI_config.seed array is required.'); } var seed = config.seed, l = seed.length, i, node; if (!self._injected) { self._injected = true; self._pending = seed.length; } for (i = 0; i < l; i++) { node = createScriptNode(seed.shift()); head.appendChild(node); if (node.async !== false) { break; } } } callback.push(function () { var i; if (!self._Y) { self.YUI.Env.core.push.apply(self.YUI.Env.core, config.extendedCore || []); self._Y = self.YUI(); self.use = self._Y.use; if (config.patches && config.patches.length) { for (i = 0; i < config.patches.length; i += 1) { config.patches[i](self._Y, self._Y.Env._loader); } } } self._Y[method].apply(self._Y, args); }); self.YUI = self.YUI || (typeof YUI != "undefined" ? YUI : null); if (!self.YUI && !self._injected) { load(); } else if (self._pending <= 0) { setTimeout(flush, 0); } return this; }};
root.YUI_config || (root.YUI_config = {});
root.YUI_config.seed = ["http:\u002F\u002Fyui.yahooapis.com\u002Fcombo?3.17.2\u002Fyui\u002Fyui-min.js"];
root.YUI_config.groups || (root.YUI_config.groups = {});
root.YUI_config.groups.app || (root.YUI_config.groups.app = {});
root.YUI_config.groups.app.modules = {"start\u002Fapp":{"path":"start\u002Fapp.js","requires":["handlebars-runtime","yui","base-build","router","pjax-base","view","start\u002Fmodels\u002Fgrid","start\u002Fviews\u002Finput","start\u002Fviews\u002Foutput","start\u002Fviews\u002Fdownload"]},"start\u002Fmodels\u002Fgrid":{"path":"start\u002Fmodels\u002Fgrid.js","requires":["yui","querystring","base-build","model","model-sync-rest","start\u002Fmodels\u002Fmq"]},"start\u002Fmodels\u002Fmq":{"path":"start\u002Fmodels\u002Fmq.js","requires":["css-mediaquery","attribute","base-build","model","model-list"]},"start\u002Fviews\u002Fdownload":{"path":"start\u002Fviews\u002Fdownload.js","requires":["yui","base-build","querystring","view"]},"start\u002Fviews\u002Finput":{"path":"start\u002Fviews\u002Finput.js","requires":["base-build","start\u002Fmodels\u002Fmq","start\u002Fviews\u002Ftab"]},"start\u002Fviews\u002Foutput":{"path":"start\u002Fviews\u002Foutput.js","requires":["base-build","escape","start\u002Fviews\u002Ftab"]},"start\u002Fviews\u002Ftab":{"path":"start\u002Fviews\u002Ftab.js","requires":["yui","base-build","view"]}};
}(this));
</script>
<script>
app.yui.use('node-base', 'node-event-delegate', function (Y) {
    // This just makes sure that the href="#" attached to the <a> elements
    // don't scroll you back up the page.
    Y.one('body').delegate('click', function (e) {
        e.preventDefault();
    }, 'a[href="#"]');
});
</script>






</body>
</html>