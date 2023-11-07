var History = new Vue({
    el: '#History',
    data: {
        StartDate: '',
        EndDate: '',
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            this.GetDate();
        },
        GetDate: function() {
            var date = new Date();
            var Year = date.getFullYear();
            var Month = date.getMonth() + 1;
            if(Month.toString().length == 1){
                Month = "0" + Month;
            }
            var Day = date.getDate();
            if(Day.toString().length == 1){
                Day = "0" + Day;
            }
            this.StartDate = Year + "-" + Month + "-01";
            this.EndDate = Year + "-" + Month + "-" + Day;
        },
    },
})