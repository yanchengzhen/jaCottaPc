$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            httpUrl: httpUrl,
            categoryList: [],
            categoryIndex: 0,
            childCategoryOld: null,
            productItemList: [],
            loading: false,
            pageNo: 1,      //分页初始化到第几页
            pages: 2         //分页公共多少页
        },
        methods: {
            /**
             * 通过点击分类 获取产品
             * @param type 点击第一级 1 第二级 2
             * @param index 第一级下标
             * @param child 第二级对象
             */
            changeCategory: function (type, index, child) {
                vm.categoryList[vm.categoryIndex].active = false;
                vm.categoryIndex = index;
                vm.categoryList[index].active = true;
                //子元素选中状态
                if (vm.childCategoryOld) {
                    vm.childCategoryOld.active = false;
                }
                if (child) {
                    vm.childCategoryOld = child;
                    child.active = true;
                }
                var categoryId;
                if (type == 1) {
                    categoryId = vm.categoryList[vm.categoryIndex].id;
                } else {
                    categoryId = child.id;
                }
                //获取当前点击的数据
                getProductList(categoryId);
                //将分页重新赋值到第一页
                vm.pageNo = 1;
            },
            productCollect: function (item) {
                if (!localStorage.getItem("user")) {
                    toastr.error("请登录");
                    $("#deleteModal").modal('show');
                } else {
                    if (vm.loading) {
                        return
                    }
                    vm.loading = true;
                    ajax("collectAdd.php", {uid: JSON.parse(localStorage.getItem("user")).id, pid: item.id})
                        .then((response) => {
                            toastr.success("collect success");
                            item.collect = true;
                            vm.loading = false;
                        })
                        .catch((err) => {
                            vm.loading = false;
                            toastr.error(err);
                        });
                }
            },
            msgListView(curPage) {
                //根据当前页获取数据
                getProductList(vm.categoryList[vm.categoryIndex].id, curPage);
            }
        },
    });

    /**
     * 获取产品类别
     */
    ajax('categoryGetAll.php')
        .then((response) => {
            if (response && response.data.length > 0) {
                vm.categoryList = response.data;
                for (var i = 0; i < vm.categoryList.length; i++) {
                    vm.categoryList.active = false;
                    for (var j = 0; j < vm.categoryList[i].categoryChildren.length; j++) {
                        vm.categoryList[i].categoryChildren[j].active = false;
                    }
                }
                vm.categoryList[0].active = true;
                getProductList(vm.categoryList[0].id);
            }
        });

    /**
     * 通过分类id获取产品数据
     * @param categoryId      分类id
     * @param page            页数
     * @param size            每页条数
     */
    function getProductList(categoryId, page = 1, size = 8) {
        if (vm.loading) {
            return
        }
        vm.loading = true;
        vm.productItemList = [];
        ajax("productCategoryGet.php", {id: categoryId, page: page, size: size})
            .then((response) => {
                if (response && response.advice) {
                    for (var i = 0; i < response.data.length; i++) {
                        response.data[i].collect = false;
                    }
                    vm.productItemList = response.data;
                    //总共多少页赋值
                    vm.pages = Math.ceil(response.message / size);
                    vm.loading = false;
                }
            })
            .catch((err) => {
                vm.loading = false;
                toastr.error(err);
            });
    }

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

});
