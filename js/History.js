var History = new Vue({
    el: '#History',
    data: {
        StartDate: '',
        EndDate: '',
        HistoryList: [],
    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            if(Index.GUID == '' && Index.ChinName == ''){
                alert("請先登入")
                Index.LogIn();
            }
            else {
                this.GetDate();
            }
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
            this.GetHistoryList();
        },
        GetHistoryList: function() {
            this.$http.get(Index.Url + "GetHistory.ashx?UserGUID=" + Index.GUID + "&StartDate=" + this.StartDate + "&EndDate=" + this.EndDate).then(
                function(response){
                    var res = response.data;
                    if(res.Code == "0"){
                        this.HistoryList = res.Data;
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("'查詢熱量統計表錯誤")
                    console.log(error)
                }
            )
        },
        TimeChange: function() {
            var StartDate = new Date(this.StartDate);
            var EndDate = new Date(this.EndDate);
            if(EndDate < StartDate){
                alert("結束日不得小於起始日")
            }
            else{
                this.GetHistoryList();
            }
        },
    },
})