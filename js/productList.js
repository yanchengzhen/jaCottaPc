$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            productList:[],
            categoryIndex:0,
            childCategoryOld:null,
            productItemList:[1,2,3,4,5,6,7,8],
        },
        methods: {
            /**
             * 通过点击分类 获取产品
             * @param index  分类下标
             */
            changeCategory:function(index){
                vm.productList[vm.categoryIndex].active = false;
                vm.categoryIndex = index;
                vm.productList[index].active = true;
            },
            changeChildCategory:function(child){
                if(vm.childCategoryOld){
                    vm.childCategoryOld.active = false;
                }
                vm.childCategoryOld = child;
                child.active = true;
            },
            productCollect:function(item){
                console.log(item);
            }
        },
    });

    /**
     * 获取产品类别与产品数据
     */
    ajax('js/service/categoryData.json')
        .then((response)=>{
            if(response && response.length>0){
                response.forEach((date)=>{
                    date.category.name = date.category.name.toUpperCase();
                    if(date.categoryChildren){
                        date.categoryChildren.forEach((type)=>{
                            type.category.name = type.category.name.toUpperCase();
                        })
                    }
                })
            }
            vm.productList = response;
        });

    // 轮播初始化
    new Swiper('.swiper-container', {
        loop: false,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination'
        }
    });

    // 轮播进入字体效果
    setTimeout(()=>{
        $('.section2SlideTop').addClass("section2SlideTopIn");
        $('.section2SlideTitle').addClass("section2TitleIn");
        $('.section2SlideDesBox').addClass("section2DesIn");
        $('.section2SlideBtnBox').addClass("section2BtnIn");
    },200)

});
