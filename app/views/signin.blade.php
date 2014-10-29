@extends('_layout.base')

@section('content')

<div class="content-wrapper">

    <div class="content">
        <h2 class="content-head is-center">Sign In to Prud.io</h2>

        <div class="pure-g">
            <div class="l-box-lrg pure-u-1 pure-u-md-1">
                <form action="/signin" method="POST" class="pure-form pure-form-stacked">
                    <fieldset>
                        
                        <label for="email">Your Email</label>
                        <input id="email" name="email" type="email" placeholder="Your Email">

                        <label for="password">Your Password</label>
                        <input id="password" name="password" type="password" placeholder="Your Password">

                        <button type="submit" class="pure-button">Sign In</button>
                    </fieldset>
                </form>
            </div>

        </div>

    </div>

</div>

<div class="footer l-box is-center">
    © Prud.io - 2014
</div>



@stop