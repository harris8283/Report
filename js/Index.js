var Index = new Vue({
    el: '#Index',
    data: {
        GUID: '',
        ChinName: '',
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
            $("#Detail").load("LogIn.html");
        },
        LogOut: function() {
            sessionStorage.clear();
            this.GUID = "";
            this.ChinName = "";
            window.location.href = "Index.html";
        },
        Store: function() {
            $("#Detail").load("Store.html");
        },
        History: function() {
            $("#Detail").load("History.html");
        },
    }
})