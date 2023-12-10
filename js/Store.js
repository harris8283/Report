var Store = new Vue({
    el: '#Store',
    data: {
        ItemList: [],
        CommodityList: [],
        CommodityIndex: "",
        CommodityCount: 1,

    },
    mounted: function() {
        this.init();
    },
    methods: {
        init: function() {
            this.GetCommodityItem();
        },
        GetCommodityItem: function() {
            this.$http.post("https://www.HaoShiang.somee.com/Public/GetCommodityItem.ashx").then(
                function(response){
                    var res = response.data;
                    if(res.Code == 0){
                        this.ItemList = res.Data;
                        this.GetCommodity(res.Data[0].Type);
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("查詢賣場清單錯誤")
                    console.log(error);
                },
            )
        },
        GetCommodity:function(Type) {
            this.$http.post("https://www.HaoShiang.somee.com/Public/GetCommodity.ashx?Type=" + Type).then(
                function(response){
                    var res = response.data;
                    if(res.Code == 0){
                        this.CommodityList = res.Data;
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("查詢商品錯誤")
                    console.log(error);
                },
            )
        },
        CommodityCountDown: function() {
            if(this.CommodityCount - 1 > 0){
                this.CommodityCount--;
            }
        },
        CommodityCountUp: function() {
            this.CommodityCount++;
        },
        CarAdd: function() {
            if(Index.GUID == '' && Index.ChinName == ''){
                alert("請先登入")
                $("#Cancel_Modal").click();
                Index.LogIn();
            }
            else{
                var obj = {

                };
                Index.cartItem.push(obj);
            }
        },
    }
})