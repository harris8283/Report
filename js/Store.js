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
                Index.LogIn();
            }
            else{
                var obj = {
                    Drink_GUID: this.CommodityList[this.CommodityIndex[0]][this.CommodityIndex[1]][this.CommodityIndex[2]].GUID,
                    Drink_Name: this.CommodityList[this.CommodityIndex[0]][this.CommodityIndex[1]][this.CommodityIndex[2]].Name,
                    Amount: this.CommodityCount,
                    Heat: this.CommodityCount * parseFloat(this.CommodityList[this.CommodityIndex[0]][this.CommodityIndex[1]][this.CommodityIndex[2]].Heat),
                    Price: this.CommodityCount * parseInt(this.CommodityList[this.CommodityIndex[0]][this.CommodityIndex[1]][this.CommodityIndex[2]].Amount),
                };
                Index.cartItem.push(obj);
            }
            this.CommodityIndex = "";
            this.CommodityCount = 1;
            $("#Cancel_Modal").click();
        },
    }
})