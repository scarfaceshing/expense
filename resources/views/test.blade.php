<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Exam</title>
        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    </head>
    <body>
        <form method="post" action="/api/data/expenses/1">
            @method('patch')
            <input type="hidden" name="csrf-token" value="{{ csrf_token() }}">
            <input type="text" name="expenses_category" />
            <input type="text" name="amount" />
            <input type="text" name="date_entry" />
            <button type="submit">Submit</button>
        </form>
    </body>
</html>
