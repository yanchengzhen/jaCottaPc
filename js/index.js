$(document).ready(function () {
    var pageHeight = $('.section1').height();
    $("#fullPage").fullpage({
        slidesColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8'],
        scrollingSpeed: 500,
        pageHeight:pageHeight,
        //页面滚动完成cb
        afterLoad: function (anchorLink, index) {
            if (index != 1) {
                $(".headerBox").addClass("headerBoxShow");
                $(".toTopBox").fadeIn();
            } else {
                $(".headerBox").removeClass("headerBoxShow");
                $(".toTopBox").fadeOut();
            }
            if (index == 2) {
                $('.section2SlideTitle').addClass("section2TitleIn");
                $('.section2SlideDesBox').addClass("section2DesIn");
                $('.section2SlideBtnBox').addClass("section2BtnIn");
            }
            if (index == 3) {
                $('.section3ProductItem').addClass("section3ProductItemIn");
            }
            if (index == 4) {
                $('.section4Item1').addClass("section4Item1In");
                $('.section4Item2').addClass("section4Item2In");
                $('.section4Item3').addClass("section4Item3In");
                $('.section4Item4').addClass("section4Item4In");
                $('.section4Item5').addClass("section4Item5In");
                $('.section4Item6').addClass("section4Item6In");
                $('.section4Item7').addClass("section4Item7In");
            }
            if (index == 5) {
                $('.section5TitleBox').addClass("section5TitleBoxIn");
                $('.section5DesBox').addClass("section5DesBoxIn");

            }
            if (index == 6) {

            }
            if (index == 7) {
                $('.section7Item1').addClass("section7Item1In");
                $('.section7Item2').addClass("section7Item2In");
                $('.section7Item3').addClass("section7Item3In");
                $('.section7Item4').addClass("section7Item4In");
                $('.section7Item5').addClass("section7Item5In");
            }
            if (index == 8) {

            }
        },
        onLeave: function (index, direction) {
            if (index == '2') {
                $('.section2SlideTitle').removeClass("section2TitleIn");
                $('.section2SlideDesBox').removeClass("section2DesIn");
                $('.section2SlideBtnBox').removeClass("section2BtnIn");
            }
            if (index == '3') {
                $('.section3ProductItem').removeClass("section3ProductItemIn");
            }
            if (index == '4') {
                $('.section4Item1').removeClass("section4Item1In");
                $('.section4Item2').removeClass("section4Item2In");
                $('.section4Item3').removeClass("section4Item3In");
                $('.section4Item4').removeClass("section4Item4In");
                $('.section4Item5').removeClass("section4Item5In");
                $('.section4Item6').removeClass("section4Item6In");
                $('.section4Item7').removeClass("section4Item7In");
            }
            if (index == '5') {
                $('.section5TitleBox').removeClass("section5TitleBoxIn");
                $('.section5DesBox').removeClass("section5DesBoxIn");
            }
            if (index == '6') {

            }
            if (index == '7') {
                $('.section7Item1').removeClass("section7Item1In");
                $('.section7Item2').removeClass("section7Item2In");
                $('.section7Item3').removeClass("section7Item3In");
                $('.section7Item4').removeClass("section7Item4In");
                $('.section7Item5').removeClass("section7Item5In");
            }
            if (index == '8') {

            }
        }
    });

    // 点击GO按钮 移动到下一屏
    $(".section1BtnBox").on("click",function(){
        $.fn.fullpage.moveSectionDown();
    });

    // 点击返回顶部按钮
    $(".toTopBtn").on("click",function(){
        $.fn.fullpage.moveTo(1);
    });

    // 轮播初始化
    new Swiper('.swiper-container', {
        loop: false,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination'
        }
    });
});
