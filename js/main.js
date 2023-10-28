var app = new Vue({
    el: '#app',
    data: {
        GUID: '',
        ChinName: '',
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            if(sessionStorage.getItem("GUID") != ""){
                this.GUID = sessionStorage.getItem("GUID");
            }
            if(sessionStorage.getItem("ChinName") != ""){
                this.ChinName = sessionStorage.getItem("ChinName");
            }
        },
        LogIn: function() {
            window.location.href = "LogIn.html";
        },
        LogOut: function() {
            sessionStorage.clear();
            this.GUID = "";
            this.ChinName = "";
            window.location.href = "Index.html";
        },
    }
})