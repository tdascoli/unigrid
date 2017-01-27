$(function () {
    $('#show-border').click(function () {
        $('.card').toggleClass('show-border');
    });

    $('#hamburger-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.grid').toggleClass('show-grid');
    });

    $('#hamburger-col-grid').click(function(){
        $(this).toggleClass('is-active');
        $('.col-grid').toggleClass('show-grid');
    });
});