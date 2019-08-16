slider_gallery = (function(){
    var sliderPlay, 
        $this = $('.slider-gallery');
    var sliderCount = $this.find($('.slider-gallery-Content li')).length;

    $('.slider-gallery').append('<ul class="images-Content"></ul>');

    for (i = 0; i < sliderCount; i++){
        var galleryImages = $('.slider-gallery-Content li').eq(i).clone();
        $('.images-Content').append(galleryImages);
    }

    var sliderWidth = $('.slider-gallery').width();
    $('.slider-gallery-Content li').css(
        'width', (sliderWidth - 1)
    )
    var liWidth = $this.find($('.slider-gallery-Content li')).width();

    var liIndex = 0;
    $('.sliderBar li').eq(liIndex).addClass('active-slide');
    $('.images-Content li').click(       
        function(){
            clearInterval(sliderPlay);
            sliderPlay = setInterval( sliderGo , 3000);

            liIndex = $(this).index();

            $('.slider-gallery-Content li').eq(liIndex).addClass('active-slide').siblings('li').removeClass('active-slide');
            $(this).addClass('active-slide').siblings('li').removeClass('active-slide');
        }
    )

    sliderPlay = setInterval( sliderGo , 3000);

    function sliderGo(){

        if( liIndex < sliderCount-1 )
        {
            liIndex++;
        }else{
            $('.slider-gallery-Content li').eq(0).addClass('active-slide').siblings('li').removeClass('active-slide');
            $('.images-Content li').eq(0).addClass('active-slide').siblings('li').removeClass('active-slide');
            liIndex=0;
        }

        console.log(liIndex);
        $('.slider-gallery-Content li').eq(liIndex).addClass('active-slide').siblings('li').removeClass('active-slide');
        $('.images-Content li').eq(liIndex).addClass('active-slide').siblings('li').removeClass('active-slide');

        
        
    }
})