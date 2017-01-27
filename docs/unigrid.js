$(function () {
    function isEven(n) {
        n = Number(n);
        return n === 0 || !!(n && !(n % 2));
    }
    function isOdd(n) {
        return isEven(Number(n) + 1);
    }
    function fTeiler(iZ, iT) {
        var iR = 0;
        if (iT != 0) //Division durch 0 ist verboten!
        {
            iR = iZ % iT;
            if (iR == 0) {
                //Es bleibt kein Rest - iZ ist teilbar durch iT
                return true;
            }
            else {
                //Es bleibt ein Rest - iZ ist nicht teilbar durch iT
                return false;
            }
        }
        else {
            //wegen verbotener Division durch 0 nicht teilbar
            return false;
        }
    }
    function getTeiler(iZahl) {
        var aTeiler=[];
        var bOK = false;
        if (iZahl >= 1) {
            for (var iT = 1; iT <= iZahl; iT++) // von 1 bis Zahl hochzählen
            {
                bOK = fTeiler(iZahl, iT);//Funktionsaufruf fTeiler
                if (bOK == true) {
                    aTeiler.push(iT);
                }
            }
        }
        return aTeiler;
    }

    // generate row grid
    var grid = 24;
    var teiler=getTeiler(grid);
    for (var i = 1; i <= grid; i++) {
        $('.grid').append('<div class="brick"><div>' + i + '</div></div>');

        if (i < grid) {
            $('.demo2').append('<div class="unigrid--row"><div class="brick brick--' + i + '"><div class="content">' + i + '</div></div><div class="brick brick--' + (grid - i) + '"><div class="content">' + (grid - i) + '</div></div></div>');
        }
    }
    for (i = 1; i <= (grid / 2); i++) {
        $('.demo3').append('<div class="brick brick--1 prepend--1"><div class="content">A</div></div>');
        $('.demo4').append('<div class="brick brick--1 append--1"><div class="content">A</div></div>');
    }
    teiler.forEach(function(teiler){
        $('.demo1').append('<div class="demo-'+teiler+' unigrid--row"></div><hr />');
        for (i = 1; i <= (grid / teiler); i++) {
            $('.demo-'+teiler).append('<div class="brick brick--'+teiler+'"><div class="content">'+teiler+'</div></div>');
        }
    });
    // end generate row grid

    var cardHeight=$('#show-grid').innerHeight();
    var cardWidth=$('#show-grid').innerWidth();
    var padding = parseFloat($('.brick').css('marginTop'));
    $('.grid').css('height',cardHeight-(2*padding));

    // generate col grid
    var cardWidth=$('#show-grid').innerWidth();
    $('.col-grid').css('width',cardWidth);
    $('.col-grid').append('<div class="brick brick--col--1"><div>1</div></div>');
    var colGridHeight=$('.brick--col--1').outerHeight(true);
    var colGrid=cardHeight/colGridHeight;
    for (var i = 2; i <= colGrid; i++) {
        $('.col-grid').append('<div class="brick brick--col--1"><div>' + i + '</div></div>');
    }
    // end generate col grid
});