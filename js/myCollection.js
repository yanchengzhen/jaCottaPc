$(document).ready(function () {
    //Vue 实例化
    var vm = new Vue({
        el: '#main',
        data: {
            productItemList:[],
            loading:false,
            pageNo: 1,      //分页初始化到第几页
            pages:8         //分页公共多少页
        },
        methods: {
            msgListView(curPage){
                //根据当前页获取数据

            }
        },
    });

    /**
     * 获取用户收藏产品数据
     * @param userId
     */
    function getCollectionList(userId){
        if(vm.loading){
            return
        }
        vm.loading = true;
        ajax('jaCottaPc/js/service/collectionData.json')
            .then((response)=>{
                vm.productItemList = [];
                setTimeout(()=>{
                    if(response && response.length>0){
                        vm.loading = false;
                        vm.productItemList = response;
                    }
                },500)
            });
    }
    //获取用户收藏产品数据
    getCollectionList();
});
