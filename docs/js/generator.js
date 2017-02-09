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

    // (($grid-brick-width+$grid-gutter)*$grid)-$grid-gutter
    function getTotalWidth() {
        var gridAmount   = parseFloat($('#grid').val());
        var gridGutter   = parseFloat($('#grid-gutter').val());
        var brickWidth   = parseFloat($('#brick-width').val());
        var brickPadding = parseFloat($('#brick-padding').val());

        /*var vars = '$grid: '+gridAmount+';\n'+
                    '$grid-gutter: '+gridGutter+'px;\n'+
                    '$grid-brick-padding: '+brickPadding+'px;\n'+
                    '$grid-brick-width: '+brickWidth+'px;';

        $('#vars').val(vars);*/

        return ((brickWidth + gridGutter) * gridAmount) - gridGutter;
    }
    $('#total-width').val(getTotalWidth());

    $('#grid').change(function(){
        $('#total-width').val(getTotalWidth());
    });
    $('#grid-gutter').change(function(){
        $('#total-width').val(getTotalWidth());
    });
    $('#brick-width').change(function(){
        $('#total-width').val(getTotalWidth());
    });

    $('#reload').click(function(){
        var vars = '';
        var params={};
        $.ajax({
            url:'http://codepen.io/tdascoli/pen/OWjYGL.scss',
            success: function (data){
                var lines = data.split('\n');
                var record=false;
                lines.forEach(function(line) {
                    if (line.substr(0,6)==='//ende'){
                        record=false;
                        return false;
                    }

                    if(record){
                        vars=vars+line+'\n';
                        var values=line.split(':');
                        params[values[0]]=parseFloat(values[1]);
                    }

                    if (line.substr(0,7)==='//start'){
                        record=true;
                    }
                });
                $('#vars').val(vars);
                $('#grid').val(params['$grid']);
                $('#grid-gutter').val(params['$grid-gutter']);
                $('#brick-width').val(params['$grid-brick-width']);
                $('#brick-padding').val(params['$grid-brick-padding']);
            }
        });
    });

    $('#generate').click(function(){
        $('.grid').empty();
        $('.demo1').empty();
        $('.demo2').empty();
        $('.demo3').empty();
        $('.demo4').empty();
        // generate grid
        var grid = $('#grid').val() || 24;
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
        // end generate grid

        var cardHeight=$('#show-grid').innerHeight();
        var padding = parseFloat($('.brick').css('marginTop'));
        $('.grid').css('height',cardHeight-(2*padding));
    });
});