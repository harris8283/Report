var Index = new Vue({
    el: '#Index',
    data: {
        //Url: 'http://localhost:52150/Public/',
        Url: 'https://www.HaoShiang.somee.com/Public/',
        GUID: '',
        ChinName: '',
        IsRegister: false,
        cartItem : [],
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            if(sessionStorage.getItem("GUID") != null){
                this.GUID = sessionStorage.getItem("GUID");
            }
            if(sessionStorage.getItem("ChinName") != null){
                this.ChinName = sessionStorage.getItem("ChinName");
            }
            this.GetShoppingCar();
            $("#Detail").load("Store.html");
        },
        LogIn: function() {
            this.IsRegister = true;
            $("#Detail").load("LogIn.html");
        },
        LogOut: function() {
            this.IsRegister = false;
            sessionStorage.clear();
            this.GUID = "";
            this.ChinName = "";
            window.location.href = "Index.html";
        },
        Store: function() {
            this.IsRegister = false;
            $("#Detail").load("Store.html");
        },
        History: function() {
            this.IsRegister = false;
            $("#Detail").load("History.html");
        },
        ShoppingCart: function() {
            this.IsRegister = false;
          $("#Detail").load("ShoppingCart.html");  
        },
        GetShoppingCar: function() {
            if(this.GUID != "" && this.ChinName != ""){
                this.$http.get(this.Url + "GetShoppingCar.ashx?UserGUID=" + this.GUID).then(
                    function(response){
                        var res = response.data;
                        if(res.Code == 0){
                            this.cartItem = res.Data;
                        }
                        else{
                            alert(res.Message)
                        }
                    },
                    function(error){
                        alert("查詢購物車資料錯誤")
                        console.log(error);
                    },
                )
            }
        },
    }
})