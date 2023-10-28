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
            if(localStorage.getItem("GUID") != ""){
                this.GUID = localStorage.getItem("GUID");
            }
            if(localStorage.getItem("ChinName") != ""){
                this.ChinName = localStorage.getItem("ChinName");
            }
        },
        LogIn: function() {
            window.location.href = "LogIn.html";
        },
    }
})