$(function() {
    /* 按下GoTop按鈕時的事件 */
    $('#gotop').click(function(){
        $('html,body').animate({ scrollTop: 0 }, 'slow');   /* 返回到最頂上 */
        return false;
    });
    
    /* 偵測卷軸滑動時，往下滑超過400px就讓GoTop按鈕出現 */
    $(window).scroll(function() {
        if ( $(this).scrollTop() > 400){
            $('#gotop').fadeIn();
        } else {
            $('#gotop').fadeOut();
        }
    });
});

var Index = new Vue({
    el: '#Index',
    data: {
        //Url: 'http://localhost:52150/Public/',
        Url: 'https://www.HaoShiang.somee.com/Public/',
        GUID: '',
        ChinName: '',
        IsRegister: false,
        cartItem : [],
        isMenuOpen: true,
        screenWidth: window.innerWidth,
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
    methods: {
        init: function() {
            if(sessionStorage.getItem("GUID") != null){
                this.GUID = sessionStorage.getItem("GUID");
            }
            if(sessionStorage.getItem("ChinName") != null){
                this.ChinName = sessionStorage.getItem("ChinName");
            }
            this.GetShoppingCar();
            $("#Detail").load("Store.html");
            this.handleScreenWidthChange();
        },
        LogIn: function() {
            this.IsRegister = true;
            $("#Store_span").css("color","");
            $("#History_span").css("color","");
            $("#ShoppingCart_i").removeClass("fa-solid");
            $("#ShoppingCart_i").addClass("fa-regular");
            $("#Detail").load("LogIn.html");
            this.handleScreenWidthChange();
        },
        LogOut: function() {
            this.IsRegister = false;
            sessionStorage.clear();
            this.GUID = "";
            this.ChinName = "";
            window.location.href = "Index.html";
            this.handleScreenWidthChange();
        },
        Store: function() {
            this.IsRegister = false;
            $("#Store_span").css("color","#FAE6B1");
            $("#History_span").css("color","");
            $("#ShoppingCart_i").removeClass("fa-solid");
            $("#ShoppingCart_i").addClass("fa-regular");
            $("#Detail").load("Store.html");
            this.handleScreenWidthChange();
        },
        History: function() {
            this.IsRegister = false;
            $("#Store_span").css("color","");
            $("#History_span").css("color","#FAE6B1");
            $("#ShoppingCart_i").removeClass("fa-solid");
            $("#ShoppingCart_i").addClass("fa-regular");
            $("#Detail").load("History.html");
            this.handleScreenWidthChange();
        },
        ShoppingCart: function() {
            this.IsRegister = false;
            $("#Store_span").css("color","");
            $("#History_span").css("color","");
            $("#ShoppingCart_i").addClass("fa-solid");
            $("#ShoppingCart_i").removeClass("fa-regular");
          $("#Detail").load("ShoppingCart.html"); 
          this.handleScreenWidthChange(); 
        },
        GetShoppingCar: function() {
            if(this.GUID != "" && this.ChinName != ""){
                this.$http.get(this.Url + "GetShoppingCar.ashx?UserGUID=" + this.GUID).then(
                    function(response){
                        var res = response.data;
                        if(res.Code == 0){
                            this.cartItem = res.Data;
                        }
                        else{
                            alert(res.Message)
                        }
                    },
                    function(error){
                        alert("查詢購物車資料錯誤")
                        console.log(error);
                    },
                )
            }
        },
        toggleMenu: function() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        handleScreenWidthChange: function () {
            var screenWidth = window.innerWidth;
            if(screenWidth <= 426){
                this.isMenuOpen = false;
                $("#hamburger-icon").css({"display":"block"});
            }
            else{
                this.isMenuOpen = true;
                $("#hamburger-icon").css({"display":"none"});
            }
        },
    }
})