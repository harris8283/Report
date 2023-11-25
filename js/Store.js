var Store = new Vue({
    el: '#Store',
    data: {
        ItemList: [],
        CommodityList: [],
        ItemType: '',
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
                        this.ItemType = res.Data[0].Type;
                        this.GetCommodity();
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
        GetCommodity:function() {
            this.$http.post("https://www.HaoShiang.somee.com/Public/GetCommodity.ashx?Type=" + this.ItemType).then(
                function(response){
                    var res = response.data;
                    if(res.Code == 0){
                        this.CommodityList = res.Data;
                        console.log(this.CommodityList)
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
    }
})