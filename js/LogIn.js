var app = new Vue({
    el: '#app',
    data: {
        UserName: '',
        PassWord: '',
    },
    methods: {
        LogIn: function() {
            var Url = "https://www.HaoShiang.somee.com/Public/LogIn.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord;
            this.$http.get(Url).then(
                function(response){
                    console.log(window.opener)
                    var res = response.body;
                    alert(res.Message);
                    if(res.Code == "0"){
                        var res2 = res.Data[0];
                        sessionStorage.setItem("GUID", res2.GUID);
                        sessionStorage.setItem("ChinName", res2.ChinName);
                        window.location.href = "Index.html";
                    }
                },
                function(error){
                    alert("登入失敗")
                    console.log(error)
                }
            )
        },
    },
})