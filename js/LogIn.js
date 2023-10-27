var app = new Vue({
    el: '#app',
    data: {
        UserName: '',
        PassWord: '',
    },
    methods: {
        LogIn: function() {
            var Url = "http://www.HaoShiang.somee.com/Public/LogIn.ashx?UserName=" + this.UserName + "&PassWord=" + this.PassWord;
            this.$http.get(Url).then(
                function(response){

                },
                function(error){
                    
                }
            )
        },
    },
})