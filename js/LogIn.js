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
                    var res = response.body;
                    alert(res.Message);
                    if(res.Code == "0"){
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