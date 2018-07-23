$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            categoryList:[],
            categoryIndex:0,
            childCategoryOld:null,
            productItemList:[],
            loading:false,
            pageNo: 1,      //分页初始化到第几页
            pages:8         //分页公共多少页
        },
        methods: {
            /**
             * 通过点击分类 获取产品
             * @param type 点击第一级 1 第二级 2
             * @param index 第一级下标
             * @param child 第二级对象
             */
            changeCategory:function(type,index,child){
                vm.categoryList[vm.categoryIndex].active = false;
                vm.categoryIndex = index;
                vm.categoryList[index].active = true;
                //子元素选中状态
                if(vm.childCategoryOld){
                    vm.childCategoryOld.active = false;
                }
                if(child){
                    vm.childCategoryOld = child;
                    child.active = true;
                }
                var categoryId;
                if(type==1){
                    categoryId = vm.categoryList[vm.categoryIndex].id;
                }else{
                    categoryId = child.id;
                }
                //获取当前点击的数据
                getProductList(categoryId);
            },
            productCollect:function(item){
                item.collect = !item.collect;
            },
            msgListView(curPage){
                //根据当前页获取数据

            }
        },
    });

    /**
     * 获取产品类别
     */
    ajax('jaCottaServe/categoryGetAll.php')
        .then((response)=>{
            if(response && response.data.length>0){
                vm.categoryList = response.data;
                for(var i=0;i<vm.categoryList.length;i++){
                    vm.categoryList.active = false;
                    for(var j=0;j<vm.categoryList[i].categoryChildren.length;j++){
                        vm.categoryList[i].categoryChildren[j].active = false;
                    }
                }
                vm.categoryList[0].active = true;
                // getProductList(vm.categoryList[0].id);
            }
        });

    /**
     * 将分类 数据添加到相应的父元素子集中
     * @param item
     */
    function findChildren(item){

    }

    /**
     * 通过分类id获取产品数据
     * @param categoryId
     */
    function getProductList(categoryId){
        if(vm.loading){
            return
        }
        vm.loading = true;
        ajax('jaCottaPc/js/service/productData.json')
            .then((response)=>{
                vm.productItemList = [];
                setTimeout(()=>{
                    if(response && response.length>0){
                        vm.loading = false;
                        var product = response.find((date)=>{
                            return date.categoryId == categoryId;
                        });
                        if(product){
                            vm.productItemList = product.product;
                        }else{
                            vm.productItemList = [];
                        }
                    }
                },500)
            });
    }

    // 轮播初始化
    new Swiper('.swiper-container', {
        loop: false,
        autoplay: false,
        pagination: {
            el: '.swiper-pagination',
            clickable:true
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
