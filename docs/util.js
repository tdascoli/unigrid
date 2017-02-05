$(function () {
    $('.show-border').click(function () {
        $(this).toggleClass('is-active');
        $('#show-grid').toggleClass('show-border');
    });

    $('#mobile-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.mobile-grid').toggleClass('show-grid');
    });

    $('#mobile-col-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.mobile-col-grid').toggleClass('show-grid');
    });

    $('#hamburger-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.grid').toggleClass('show-grid');
    });

    $('#hamburger-col-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.col-grid').toggleClass('show-grid');
    });

    $('#hamburger').click(function () {
        $(this).toggleClass('is-active');
        //$('#drawerExample2').toggleClass('open');
    });
});