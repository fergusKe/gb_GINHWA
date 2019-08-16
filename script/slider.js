slider = (function(){
    var i,
        slider,
        slider_ul,
        prevBtn,
        nextBtn,
        dotMenu,
        dotMenu_li,
        currentImgIndex = 0,
        pseudoIndex,
        imgInterval = 4000,
        intervalId,
        cloneFirst,
        cloneLast,
        imgCount = $('.slider ul li').length,
        unitWidth = $(window).width();

    slider = $('.slider');
    slider_ul = $( $('.sliderContent'), slider);

    arrow = $('<ul class="arrow"/>');
    prevBtn = $('<li class="prevBtn"><img src="images/default/L.png"></li>');
    nextBtn = $('<li class="nextBtn"><img src="images/default/R.png"></li>');
    arrow.append(prevBtn).append(nextBtn);
    slider.prepend(arrow);

    cloneFirst = $('li', slider_ul).first().clone();
    cloneLast = $('li', slider_ul).last().clone();
    slider_ul.append( cloneFirst );
    slider_ul.prepend( cloneLast );

    $(window).resize(function() {
        unitWidth = $(window).width();

        if(unitWidth <= 1024) {
            unitWidth = 1024;
        }

        $('li', slider_ul).css(
            'width', unitWidth
        )

        slider_ul.css({
            width: (imgCount + 2) * unitWidth,
            left: -unitWidth
        });
        
    }).resize();

    // if(unitWidth <= 1024) {
    //     unitWidth = 1024;
    // }

    // $('li', slider_ul).css(
    //     'width', unitWidth
    // )

    // slider_ul.css({
    //     width: (imgCount + 2) * unitWidth,
    //     left: -unitWidth
    // });

    dotMenu = $('<ol class="dotMenu"/>');
    for(i=0; i<imgCount; i++) {
        dotMenu.append('<li/>');
    }
    slider.append( dotMenu );

    dotMenu_li = $('li', dotMenu);
    dotMenu_li.eq(currentImgIndex).addClass('active');

    dotMenu_li.click(function() {
        slideRollTo( $(this).index() );
    });

    run();

    function run() {
        intervalId = setInterval(autoShowNextImg, imgInterval);
    }

    function autoShowNextImg() {
        slideRollTo( currentImgIndex+1 );
    }

    prevBtn.click(function() {
        clearInterval(intervalId);
        slideRollTo( currentImgIndex-1 );
        // run();
    });

    nextBtn.click(function() {
        clearInterval(intervalId);
        slideRollTo( currentImgIndex+1 );
        // run();
    });

    // slider.hover(
    //     function() {
    //         clearInterval(intervalId);
    //     }, function() {
    //         intervalId = setInterval(autoShowNextImg, imgInterval);
    //     }
    // );

    function slideRollTo( targetIndex ) {
        var targetLeft = 0;
        targetIndex = (targetIndex + imgCount) % imgCount;
        // console.log('currentImgIndex='+currentImgIndex);
        // console.log('targetIndex='+targetIndex);

        if(currentImgIndex===0 && targetIndex===imgCount-1) {
            targetLeft = 0;
        } else if(currentImgIndex===imgCount-1 && targetIndex===0) {
            targetLeft = -(imgCount + 1) * unitWidth;
        } else {
            targetLeft = -(targetIndex + 1) * unitWidth;;
        }
        currentImgIndex = targetIndex;

        slider_ul.stop().animate({
            left: targetLeft
        }, 500, function() {  
            slider_ul.css({
                left: -(currentImgIndex + 1) * unitWidth
            });
        });

        dotMenu_li.eq(currentImgIndex).addClass('active').siblings('li').removeClass('active');
    }
})