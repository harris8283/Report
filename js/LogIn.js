var LogIn = new Vue({
    el: '#LogIn',
    data: {
        UserName: '',
        PassWord: '',
        Name: '',
        IsRegister: false,
    },
    methods: {
        LogIn: function() {
            var Url = "https://www.HaoShiang.somee.com/Public/LogIn.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord;
            this.$http.get(Url).then(
                function(response){
                    var res = response.body;
                    if(res.Code == "0"){
                        var res2 = res.Data[0];
                        sessionStorage.setItem("GUID", res2.GUID);
                        sessionStorage.setItem("ChinName", res2.ChinName);
                        window.location.href = "Index.html";
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("登入失敗")
                    console.log(error)
                }
            )
        },
        Register: function() {

        },
    },
})