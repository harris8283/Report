var app = new Vue({
    el: '#app',
    data: {
        UserName: '',
        PassWord: '',
    },
    methods: {
        LogIn: function() {
            var Url = "http://www.HaoShiang.somee.com/Public/LogIn.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord;
            $.ajax({
                url: Url,
                type: 'GET',
                dataType: 'json', // 預期的回應數據類型
                success: function(data) {
                    alert("123")
                },
                error: function(error) {
                    alert("456")
                }
            });
        },
    },
})