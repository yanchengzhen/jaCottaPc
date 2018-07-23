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
        $(".headerLogin").hide();
        $(".headerCh").hide();
        $("body").bind("mousedown", onBodyDown);
    });

    //点击登录按钮弹出登录框
    $('#headerLogin').click(function () {
        $("#headerLoginBox").toggleClass("headerLoginBoxShow");
        $("body").bind("mousedown", onBodyDown);
    });
    $('#headerLoginIn').click(function () {
        $("#headerLoginBox").toggleClass("headerLoginBoxShow");
        $("body").bind("mousedown", onBodyDown);
    });

    //点击除搜索框之外 关闭搜索框
    function onBodyDown(event) {
        if (!(event.target.id == "headerSearch" || event.target.id == "headerLogin" || event.target.id == "headerLoginIn" || $(event.target).parents("#headerSearchBox").length > 0 || $(event.target).parents("#headerLoginBox").length > 0)) {
            $("#headerSearchBox").removeClass("headerSearchBoxShow");
            $("#headerSearchBox input").removeClass("active");
            $("#headerLoginBox").removeClass("headerLoginBoxShow");
            $(".headerLogin").show();
            $(".headerCh").show();
            $("body").unbind("mousedown", onBodyDown);
        }
    }

    // 通过查找localStorage->userName改变登录状态
    changeLoginState();

    /**
     * 退出登录
     */
    $(".headerSignUpBtn").on("click",function(){
       localStorage.removeItem("user");
       changeLoginState();
       window.location.href = "index.html";
    });

    /**
     * 滑动判断返回顶部按钮是否显示
     */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.toTopBox').fadeIn();
        } else {
            $('.toTopBox').fadeOut();
        }
    });
    /**
     * 返回顶部按钮点击执行
     */
    $('.toTopBtn').click(function () {
        $('html ,body').animate({scrollTop: 0}, 300);
        return false;
    });
});

//公共弹出框提示配置
toastr.options = {
    "closeButton": true,
    "debug": false,
    "progressBar": true,
    "preventDuplicates": false,
    "positionClass": "toast-bottom-center",
    "onclick": null,
    "showDuration": "400",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

/**
 * 通过查找localStorage->userName改变登录状态
 */
function changeLoginState() {
    if (localStorage.getItem("user")) {
        $("#headerLogin").hide(); //头部登录按钮
        $(".stateNotLogin").hide(); //登录弹框
        $("#headerLoginIn").show();
        $(".stateLogin").show();
        $(".headerUserName").html(JSON.parse(localStorage.getItem("user")).userName);
    } else {
        $("#headerLogin").show();
        $(".stateNotLogin").show();
        $("#headerLoginIn").hide();
        $(".stateLogin").hide();
    }
}

/**
 * 使用promise 重写ajax请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
function ajax(url, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: 'http://192.168.1.243/'+url,
            type: data == null ? 'GET' : 'POST',
            dataType: "json",
            data: data == null ? '' : data,
            async: true,
            // contentType: "application/json",
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

/**
 * 删除数组元素
 * @param dx删除元素的下标.
 */
Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i]
        }
    }
    this.length-=1
};