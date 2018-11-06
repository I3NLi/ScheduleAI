<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<script>
  window.currentUser={};
  window.currentUser.id="{{Auth::user()->id}}";
</script>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- 强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览； -->
    <!-- <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">      -->

    <!-- iphone设备中的safari私有meta标签，它表示：允许全屏模式浏览 -->
    <meta content="yes" name="apple-mobile-web-app-capable">

    <!-- iphone的私有标签，它指定的iphone中safari顶端的状态条的样式；
    默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。
    注意：若值为“black-translucent”将会占据页面px位置，浮在页面上方
    会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。 -->
    <!-- <meta content="black" name="apple-mobile-web-app-status-bar-style">      -->

    <!-- 忽略将页面中的数字识别为电话号码 -->
    <!-- <meta content="telephone=no" name="format-detection"> -->




    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


</head>
<body>


    <div id="app">
    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" ></script>
</body>
</html>
