var ShoppingCart = new Vue({
    el: '#ShoppingCart',
    data: {
        CartItem: [],
        TotalPrice: 0,
        TotalHeat: 0,

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
                this.CartItem = Index.cartItem;
                this.GetTotalPrice();
                this.GetTotalHeat();
            }
        },
        GetTotalPrice: function() {
            this.TotalPrice = 0;
            for(var i = 0; i < this.CartItem.length; i++){
                this.TotalPrice += this.CartItem[i].Price * this.CartItem[i].Amount;
            }
        },
        GetTotalHeat: function() {
            this.TotalHeat = 0;
            for(var i = 0; i < this.CartItem.length; i++){
                this.TotalHeat += this.CartItem[i].Heat * this.CartItem[i].Amount;
            }
        },
        AddAmount: function(index) {
            this.CartItem[index].Amount++;
            this.GetTotalPrice();
            this.GetTotalHeat();
            Store.InsertShoppingCar();
        },
        ReduceAmount: function(index) {
            if(this.CartItem[index].Amount - 1 > 0) {
                this.CartItem[index].Amount--;
            }
            else{
                this.CartItem.splice(index, 1);
            }
            this.GetTotalPrice();
            this.GetTotalHeat();
            Store.InsertShoppingCar();
        },
        BackStore: function() {
            Index.Store();
        },
        Checkout: function() {
            this.$http.get(Index.Url + "Checkout.ashx?UserGUID=" + Index.GUID).then(
                function(response){
                    var res = response.data;
                    if(res.Code == "0"){
                        Index.Store();
                        Index.GetShoppingCar();
                    }
                    alert(res.Message)
                },
                function(error){
                    alert("購買失敗")
                    console.log(error)
                }
            )
        },
    }
})