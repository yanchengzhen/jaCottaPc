$(document).ready(function () {
    var vm = new Vue({
        el: '#main',
        data: {
            email:"",
            password:"",
            loading:false,
            forgetPwdEmail:"",
        },
        methods:{
            login:function(){
                if(vm.loading){return}
                if(!vm.email){toastr.error("email is required!");return}
                var emailRegex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if ( !emailRegex.test( vm.email ) ){toastr.error("Incorrect email address");return}
                if(!vm.password){toastr.error("password is required!");return}
                vm.loading = true;
                ajax("login.php",{email:vm.email,password:vm.password})
                    .then((response)=>{
                        if(response && response.advice){
                            toastr.success("Login successful");
                            localStorage.setItem("user",JSON.stringify(response.data));
                            setTimeout(()=>{
                                window.location.href="index.html";
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
        },
    });

    /**
     * 登录以及修改密码切换
     */
    $("#forget_pws").click(function (e) {
        e.preventDefault();
        $("#login").fadeOut(1000);
        $("#forgetPws").fadeIn(1000);
    });
    $("#close").click(function () {
        $("#forgetPws").fadeOut(1000);
        $("#login").fadeIn(1000);
    });
});