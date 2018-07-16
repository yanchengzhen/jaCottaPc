$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            teamCategoryList: [],    //团队分类列表
            categoryOldIndex:0,      //团队分类旧下标
            teamList:[],             //团队成员列表
            teamDescription:"",      //团队简介
            pageNo: 1,      //分页初始化到第几页
            pages: 2         //分页公共多少页
        },
        methods: {
            msgListView(curPage) {
                //根据当前页获取数据

            },
            /**
             * 改变团队分类
             * @param index
             */
            changeCategory:function(index){
                vm.teamCategoryList[vm.categoryOldIndex].isActive = false;
                vm.categoryOldIndex = index;
                vm.teamCategoryList[index].isActive = true;
                vm.teamList = vm.teamCategoryList[index].categoryTeam;
                vm.teamDescription = vm.teamCategoryList[index].description;
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

    $.fn.isOnScreen = function () {
        var win = $(window);
        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
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
        if ($(".historyBox").isOnScreen()) {
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

    $(".honorItem").on("click", function () {
        $(".honorSwiperBox").css("visibility", "visible");
        honorSwiper.slideTo($(this).attr("data-slide"), 0, false);
    });
    $(".honorSwiperClose").on("click", function () {
        $(".honorSwiperBox").css("visibility", "hidden");
    });

    /**
     * 获取所有团队
     */
    function getTeamAll() {
        vm.teamCategoryList = [
            {
                categoryName:"SALES",
                isActive:true,
                description:"We will give you more professional plans.",
                categoryTeam:[
                    {
                        name:"Tiffany"
                    },
                    {
                        name:"Edwina"
                    },
                    {
                        name:"Caroline"
                    },
                    {
                        name:"Tiffany1"
                    },
                    {
                        name:"Tiffany2"
                    },
                    {
                        name:"Tiffany3"
                    }
                ]
            },
            {
                categoryName:"DESIGN",
                isActive:false,
                description:"Launch the new hot style in real time,make more money in the market.",
                categoryTeam:[
                    {
                        name:"Tiffany2"
                    },
                    {
                        name:"Edwina2"
                    },
                    {
                        name:"Caroline2"
                    },
                    {
                        name:"Tiffany3"
                    },
                    {
                        name:"Tiffany4"
                    },
                    {
                        name:"Tiffany5"
                    }
                ]
            },
            {
                categoryName:"PRODUCTION",
                isActive:false,
                description:"We will finish your order on time with high quality.",
                categoryTeam:[
                    {
                        name:"Tiffany3"
                    },
                    {
                        name:"Edwina3"
                    },
                    {
                        name:"Caroline3"
                    },
                    {
                        name:"Tiffany3"
                    },
                    {
                        name:"Tiffany3"
                    },
                    {
                        name:"Tiffany3"
                    }
                ]
            },
            {
                categoryName:"QUALITY TESTING",
                isActive:false,
                description:"In China,we are more strict to product than you.",
                categoryTeam:[
                    {
                        name:"Tiffany4"
                    },
                    {
                        name:"Edwina4"
                    },
                    {
                        name:"Caroline4"
                    },
                    {
                        name:"Tiffany4"
                    },
                    {
                        name:"Tiffany4"
                    },
                    {
                        name:"Tiffany4"
                    }
                ]
            },
            {
                categoryName:"AFTER-SALES",
                isActive:false,
                description:"If you have any questions, feel free to contact us anytime.",
                categoryTeam:[
                    {
                        name:"Tiffany5"
                    },
                    {
                        name:"Edwina5"
                    },
                    {
                        name:"Caroline5"
                    },
                    {
                        name:"Tiffany5"
                    },
                    {
                        name:"Tiffany5"
                    },
                    {
                        name:"Tiffany5"
                    }
                ]
            }
        ];
        vm.teamList = vm.teamCategoryList[0].categoryTeam;
        vm.teamDescription = vm.teamCategoryList[0].description;
    }

    getTeamAll();
});