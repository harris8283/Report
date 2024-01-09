var Store = new Vue({
    el: '#Store',
    data: {
        ItemList: [],
        CommodityList: [],
        CommodityIndex: "",
        CommodityCount: 1,
        screenWidth: window.innerWidth,
        Index: 0,
    },
    mounted: function() {
        window.addEventListener('resize', () => {
            this.screenWidth = window.innerWidth;
            this.handleScreenWidthChange();
        });
        this.init();
    },
    watch: {
        screenWidth(newWidth) {
          this.handleScreenWidthChange();
        }
    },
    updated: function() {
        this.handleScreenWidthChange();
    },
    methods: {
        init: function() {
            this.GetCommodityItem();
            this.handleScreenWidthChange();
        },
        GetCommodityItem: function() {
            this.$http.post(Index.Url + "GetCommodityItem.ashx").then(
                function(response){
                    var res = response.data;
                    if(res.Code == 0){
                        this.ItemList = res.Data;
                        this.GetCommodity(res.Data[0].Name, res.Data[0].Type);
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
        GetCommodity:function(Name, Type) {
            for(var i = 0 ; i < this.ItemList.length;i++){
                $("#" + this.ItemList[i].Name + "_span").css("color", "");
            }
            $("#" + Name + "_span").css("color", "#FAE6B1");
            this.$http.post(Index.Url + "GetCommodity.ashx?Type=" + Type).then(
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
                return;
            }
            else{
                var IsExist = false;
                for(var i = 0; i < Index.cartItem.length; i++){
                    if(Index.cartItem[i].NameGUID == this.CommodityList[this.CommodityIndex[0]].GUID){
                        IsExist = true;
                        Index.cartItem[i].Amount += this.CommodityCount;
                        Index.cartItem[i].Heat += this.CommodityCount * parseFloat(this.CommodityList[this.CommodityIndex[0]].Heat);
                        Index.cartItem[i].Price += this.CommodityCount * parseInt(this.CommodityList[this.CommodityIndex[0]].Amount);
                        break;
                    }
                }
                if(IsExist == false){
                    var obj = {
                        NameGUID: this.CommodityList[this.CommodityIndex[0]].GUID,
                        Name: this.CommodityList[this.CommodityIndex[0]].Name,
                        Amount: this.CommodityCount,
                        Heat: this.CommodityCount * parseFloat(this.CommodityList[this.CommodityIndex[0]].Heat),
                        Price: this.CommodityCount * parseInt(this.CommodityList[this.CommodityIndex[0]].Amount),
                    };
                    Index.cartItem.push(obj);
                }
            }
            this.CommodityIndex = "";
            this.CommodityCount = 1;
            $("#Cancel_Modal").click();
            this.InsertShoppingCar();
        },
        InsertShoppingCar: function() {
            this.$http.post(Index.Url + "InsertShoppingCar.ashx?UserGUID=" + Index.GUID, JSON.stringify(Index.cartItem)).then(
                function(response){
                    var res = response.data;
                    if(res.Code == 0){
                        Index.GetShoppingCar();
                    }
                    else{
                        alert(res.Message)
                    }
                },
                function(error){
                    alert("購物車新增資料失敗")
                    console.log(error);
                },
            )
        },
        handleScreenWidthChange: function () {
            var screenWidth = window.innerWidth;
            if(screenWidth <= 320){
                $("#selectitem").css({"display":"block"});
                for(var i = 0 ; i < this.ItemList.length;i++){
                    $("#" + this.ItemList[i].Name + "_span").css({"display":"none"});
                }
            }
            else{
                $("#selectitem").css({"display":"none"});
                for(var i = 0 ; i < this.ItemList.length;i++){
                    $("#" + this.ItemList[i].Name + "_span").css({"display":""});
                }
            }
        },
    }
})