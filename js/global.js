$(document).ready(function () {
    setTimeout(() => {
        //为头部移动border赋值 宽 left值
        changeBorder($(".headerBoxContent .on").outerWidth(true), $(".headerBoxContent .on").position().left);
    }, 100);
    $(".headerTap").on("mouseenter", function (e) {
        e.stopPropagation();
        changeBorder($(this).outerWidth(true), $(this).position().left);
    });
    $(".headerTap").on("mouseleave", function (e) {
        e.stopPropagation();
        changeBorder($(".headerBoxContent .on").outerWidth(true), $(".headerBoxContent .on").position().left);
    });

    /**
     * 改变头部border状态
     * @param width
     * @param left
     */
    function changeBorder(width, left) {
        $(".headerTapBorder").css("width", width);
        $(".headerTapBorder").css("left", left);
    }

    //点击搜索按钮弹出搜索框
    $('#headerSearch').click(function () {
        $("#headerSearchBox").addClass("headerSearchBoxShow").find("input").addClass("active");
        $("#headerLogin").hide();
        $(".headerCh").hide();
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
            $("#headerSearchBox input").removeClass("active");
            $("#headerLoginBox").removeClass("headerLoginBoxShow");
            $("#headerLogin").show();
            $(".headerCh").show();
            $("body").unbind("mousedown", onBodyDown);
        }
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.toTopBox').fadeIn();
        } else {
            $('.toTopBox').fadeOut();
        }
    });

    $('.toTopBtn').click(function () {
        $('html ,body').animate({scrollTop: 0}, 300);
        return false;
    });

});

/**
 * 使用promise 重写ajax请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
function ajax(url, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: data == null ? 'GET' : 'POST',
            dataType: "json",
            data: data == null ? '' : JSON.stringify(data),
            async: true,
            contentType: "application/json",
            success: function (resp) {
                resolve(resp);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                switch (XMLHttpRequest.status) {
                    case(500):
                        reject('服务器系统内部错误');
                        break;
                    case(403):
                        reject("无权限执行此操作");
                        break;
                    case(408):
                        reject("请求超时");
                        break;
                    default:
                        reject(XMLHttpRequest.responseText);
                }
            }
        });
    });
}