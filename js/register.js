$(document).ready(function () {
    var vm = new Vue({
        el: '#main',
        data: {
            firstName:"",
            lastName:"",
            email:"",
            phone:"",
            password:"",
            confirmPassWord:"",
            loading:false,
        },
        methods:{
            register:function(){
                if(vm.loading){return}
                if(!vm.firstName){toastr.error("firstName is required!");return}
                if(!vm.lastName){toastr.error("lastName is required!");return}
                if(!vm.email){toastr.error("email is required!");return}
                var emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if ( !emailRegex.test( vm.email ) ){toastr.error("Incorrect email address");return}
                if(!vm.phone){toastr.error("phone is required!");return}
                if(!vm.password){toastr.error("password is required!");return}
                if(vm.password!=vm.confirmPassWord){toastr.error("confirmPassWord entry is inconsistent!");return}
                vm.loading = true;
                ajax("register.php",
                    {firstName:vm.firstName,lastName:vm.lastName,email:vm.email,phone:vm.phone,password:vm.password})
                    .then((response)=>{
                        if(response && response.advice){
                            toastr.success("Registered successfully");
                            setTimeout(()=>{
                                window.location.href="login.html";
                            },2000);
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
    })
});