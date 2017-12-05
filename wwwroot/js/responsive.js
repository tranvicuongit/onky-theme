$(document).ready(function () {
    responsive();
});
$(window).resize(function (e) {
    responsive();
    if(!($('html').hasClass('mobile'))){
        if($(window).width()<768 )
        {
            $('html').addClass('mobile').removeClass('desktop');
            if($(window).width()<320){
                $('html').removeClass('tablet').addClass('phone');
            }
            else{
                $('html').addClass('tablet').removeClass('phone');
            }
        }
        else{
            $('html').addClass('desktop').removeClass('mobile').removeClass('tablet').removeClass('phone');
        }
    }

    $('.col-map iframe').height($(window).height());
});
function responsive() {
    var md = new MobileDetect(window.navigator.userAgent);
    //Desktop
    if (md.phone() === null && md.tablet() === null) {
        $('html').addClass('desktop').removeClass('mobile').removeClass('tablet').removeClass('phone');
    }
    //Mobile
    else {
        $('html').addClass('mobile').removeClass('desktop');
        if (md.phone())
        $('html').addClass('phone').removeClass('tablet');
        else
        $('html').addClass('tablet').removeClass('phone');
    }

    //browser
    var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    var browser='';
    if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        browser = "msie";
    }
    else {
        browser = ua[1].toLowerCase();
        if(browser ==='safari')
        $('html').addClass('safari');
        else
        $('html').removeClass('safari');
    }
    $(".header").sticky({});
};
$(window).scroll(function () {
    var h =50;
    if ($(window).scrollTop() >= h) {
        $('.desktop #header').addClass('fixed');
    } 
    else {
        $('#header').removeClass('fixed');
    }
});