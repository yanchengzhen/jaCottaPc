$(document).ready(function () {
    var initWidth = $(".headerBoxContent .on").outerWidth(true);        //获取头部中class为on 的元素的宽度
    var initLeft = $(".headerBoxContent .on").position().left;          //获取头部中class为on 的元素的left
    //为头部移动border赋值 宽 left值
    changeBorder(initWidth,initLeft);
    $(".headerTap").on("mouseenter",function(e){
        e.stopPropagation();
        changeBorder($(this).outerWidth(true),$(this).position().left);
    });
    $(".headerTap").on("mouseleave",function(e){
        e.stopPropagation();
        changeBorder(initWidth,initLeft);
    });

    /**
     * 改变头部border状态
     * @param width
     * @param left
     */
    function changeBorder(width,left){
        $(".headerTapBorder").css("width",width);
        $(".headerTapBorder").css("left",left);
    }

    //点击搜索按钮弹出搜索框
    $('#headerSearch').click(function () {
        $("#headerSearchBox").toggleClass("headerSearchBoxShow");
        $("body").bind("mousedown", onBodyDown);
    });

    //点击登录按钮弹出搜索框
    $('#headerLogin').click(function () {
        $("#headerLoginBox").toggleClass("headerLoginBoxShow");
        $("body").bind("mousedown", onBodyDown);
    });

    //点击除搜索框之外 关闭搜索框
    function onBodyDown(event) {
        if (!(event.target.id == "headerSearch" || event.target.id == "headerLogin" || $(event.target).parents("#headerSearchBox").length > 0 || $(event.target).parents("#headerLoginBox").length > 0)) {
            $("#headerSearchBox").removeClass("headerSearchBoxShow");
            $("#headerLoginBox").removeClass("headerLoginBoxShow");
            $("body").unbind("mousedown", onBodyDown);
        }
    }
});