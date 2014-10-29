

@extends('_layout.base')

@section('content')

<div class="content-wrapper">

    <div class="content">
        <h2 class="content-head is-center">Sign Up to Prud.io</h2>

        <div class="pure-g">
            <div class="l-box-lrg pure-u-1 pure-u-md-1">
                
                @foreach($errors->all() as $message)
                <p>{{ $message }}</p>
                @endforeach

                <form action="/signup" method="POST" class="pure-form pure-form-stacked">
                    <fieldset>

                        <label for="name">Your Name</label>
                        <input id="name" name="name" type="text" placeholder="Your Name">

                        <label for="email">Your Email</label>
                        <input id="email" name="email" type="email" placeholder="Your Email">

                        <label for="password">Your Password</label>
                        <input id="password" name="password" type="password" placeholder="Your Password">

                        <button type="submit" class="pure-button">Sign Up</button>
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