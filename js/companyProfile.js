$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            pageNo: 1,      //分页初始化到第几页
            pages:2         //分页公共多少页
        },
        methods: {
            msgListView(curPage){
                //根据当前页获取数据

            }
        }
    });
    // banner轮播初始化
    new Swiper('.bannerSwiper', {
        loop: false,
        autoplay: false,
        pagination: {
            el: '.bannerPagination',
            clickable: true
        }
    });

    //公司历程轮播
    new Swiper('.historySwiper', {
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.historyRoundNext',
            prevEl: '.historyRoundPrev',
        }
    });

    // 轮播进入字体效果
    setTimeout(() => {
        $('.section2SlideTop').addClass("section2SlideTopIn");
        $('.section2SlideTitle').addClass("section2TitleIn");
        $('.section2SlideDesBox').addClass("section2DesIn");
        $('.section2SlideBtnBox').addClass("section2BtnIn");
    }, 200);

    $.fn.isOnScreen = function(){
        var win = $(window);
        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();
        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
    };

    $(window).scroll(function () {
        if ($(".company_main").isOnScreen()) {
            $(".company_title").addClass("active");
            $(".company_img>div").addClass("active");
            $(".company_text>div").addClass("active");
        }
        if($(".historyBox").isOnScreen()){
            $(".historyLeftImg1").addClass("historyLeftImg1In");
            $(".historyLeftImg2").addClass("historyLeftImg2In");
            $(".historyRightBox").addClass("historyRightBoxIn");
        }
    });

    //公司历程轮播
    var honorSwiper = new Swiper('.honorSwiper', {
        loop: false,
        autoplay: false,
        navigation: {
            nextEl: '.honorRoundNext',
            prevEl: '.honorRoundPrev',
        }
    });

    $(".honorItem").on("click",function(){
        $(".honorSwiperBox").css("visibility","visible");
        honorSwiper.slideTo($(this).attr("data-slide"), 0, false);
    });
    $(".honorSwiperClose").on("click",function(){
        $(".honorSwiperBox").css("visibility","hidden");
    });


});