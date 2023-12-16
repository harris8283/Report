var LogIn = new Vue({
    el: '#LogIn',
    data: {
        UserName: '',
        PassWord: '',
        ChinName: '',
        IsRegister: false,
    },
    methods: {
        LogIn: function() {
            var Url = Index.Url + "LogIn.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord;
            this.$http.get(Url).then(
                function(response){
                    var res = response.data;
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
            var CheckAns = this.CheckObj();
            if(CheckAns != ""){
                alert(CheckAns)
                return;
            }
            var Url = Index.Url + "Register.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord + "&ChinName=" + this.ChinName;
            this.$http.get(Url).then(
                function(response){
                    var res = response.data;
                    if(res.Code == "0"){
                        this.LogIn();
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("註冊失敗")
                    console.log(error)
                }
            )
        },
        CheckObj: function() {
            var chineseRegex = /[\u4e00-\u9fa5]/;
            if(chineseRegex.test(this.UserName) == true){
                return "帳號不得有中文字";
            }
            if(chineseRegex.test(this.PassWord) == true){
                return "密碼不得有中文字";
            }
            if(chineseRegex.test(this.ChinName) == false){
                return "姓名不得有非中文字";
            }
            return "";
        },
    },
})