$(document).ready(function () {
  // 轮播初始化
  new Swiper('.swiper-container', {
    loop: false,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  // 轮播进入字体效果
  setTimeout(() => {
    $('.section2SlideTop').addClass("section2SlideTopIn");
    $('.section2SlideTitle').addClass("section2TitleIn");
    $('.section2SlideDesBox').addClass("section2DesIn");
    $('.section2SlideBtnBox').addClass("section2BtnIn");
  }, 200)

  var companyaTop = $(".company").offset().top-$(".company").outerHeight(true);
  $(window).scroll(function () {
    var wThis = $(this).scrollTop();//输出到控制台
    if(wThis>=companyaTop){
      $(".company_title").addClass("active");
      $(".company_img>div").addClass("active");
      $(".company_text>div").addClass("active");
    }
  });

});