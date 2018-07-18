$(document).ready(function () {
    var vm = new Vue({
        el: '#main',
        data: {
            userName:"",
            email:"",
            phone:"",
            loading:false,
        },
        methods:{
            editUser:function(){
                if(vm.loading){return}
                if(!vm.userName){toastr.error("userName is required!");return}
                if(!vm.email){toastr.error("email is required!");return}
                var emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if ( !emailRegex.test( vm.email ) ){toastr.error("Incorrect email address");return}
                if(!vm.phone){toastr.error("phone is required!");return}
                vm.loading = true;
                ajax("http://192.168.1.118/jaCottaServe/editUser.php",{userName:vm.userName,email:vm.email,phone:vm.phone})
                    .then((response)=>{
                        if(response && response.advice){
                            toastr.success("edit user successful");
                            vm.loading = false;
                        }else{
                            toastr.error(response.message);
                            vm.loading = false;
                        }
                    })
                    .catch((err)=>{
                        toastr.error(err);
                        vm.loading = false;
                    })
            }
        }
    });
    //判断localStorage中的用户信息是否存在，存在的话给变量赋值
    if(localStorage.getItem("user")){
        vm.userName = JSON.parse(localStorage.getItem("user")).userName;
        vm.email = JSON.parse(localStorage.getItem("user")).email;
        vm.phone = JSON.parse(localStorage.getItem("user")).phone;
    }
});