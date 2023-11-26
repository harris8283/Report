var Index = new Vue({
    el: '#Index',
    data: {
        GUID: '',
        ChinName: '',
        IsRegister: false,
        cartItemCount : 0,
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
    }
})