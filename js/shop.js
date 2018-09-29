var shopCar = (function () {

    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.event();
            this.getShopListData();
        },
        event: function () {
            var _this = this;
        },
        // 获取所有商品信息
        getShopListData: function () {
            var _this = this;
            var params = {
                success: function (data) {
                    data = JSON.parse(data);
                    _this.shopList = data.data;
                    _this.getCarList();
                    // _this.insertShopList(data.data);
                }
            }
            sendAjax('json/shop.json', params);
        },
        getCarList: function () {
            // [{id: 1, count:2}, {id: 2, count: 10}]
            this.carList = JSON.parse(localStorage.shopList);
            for(var i = 0; i <  this.shopList.length; i++) {
                for(var j = 0; j < this.carList.length; j++) {
                    if(this.shopList[i].id == this.carList[j].id) {
                        // this.carList[j] = {
                        //     ...this.carList[j],
                        //     ...this.shopList[i]
                        // }
                        Object.assign(this.carList[j], this.shopList[i]);
                        break;
                    }
                }
            }
            console.log(this.carList);
            this.countPrice(this.carList);
            this.insertCarList(this.carList);
        },
        // 计算总价
        countPrice: function(arr) {
           arr = arr.map(x => {
               return x.countPrice = x.price * x.count;
           })
        },
        // 把购物车数据渲染到页面中
        insertCarList: function (data) {
            var arr = [];
            var shop;
            // debugger
            console.log(this.shopList)
            for (var i = 0; i < data.length; i++) {
                // 通过id获取商品信息
                // for(var j = 0; j < this.shopList.length; j++) {
                //     if(data[i].id == this.shopList[j].id) {
                //         shop = this.shopList[j];
                //         break;
                //     }
                // }
                arr.push(`<div>
                        商品名称:<span class="shop-name">${data[i].name}</span><br />
                        数量: <input class="shop-count" type="number" value="${data[i].count}" /><br />
                        价格: <span class="shop-price">${data[i].price}</span><br />
                        商品总价: <span class="shop-total">${data[i].countPrice}</span>
                        商品提示: <span class="shop-tip">${data[i].ps}</span>
                        <button class="btn shop-btn-del" attr-index="${i}">删除</button>
                    </div>`);

            }
            this.$ele.innerHTML = arr.join('');
        },
    }
}())