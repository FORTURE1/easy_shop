var shop = (function(){
	return {
		init:function(ele){
			this.$ele = document.querySelector(ele);
			this.getShopData();
			this.event();
		},
		event:function(){
			var _this = this;
			this.$ele.addEventListener('click', function(e){
			e = e || window.event;
			var target = e.target || e.ssrcElement;
			if(target.nodeName == 'BUTTON' && target.className == 'btn shop-btn-car') {
				var id = target.getAttribute('attr-id');
				var count = target.parentNode.querySelector('.shop-count').value;
				_this.addCar(id,count);
			}

			},false)
		},
		getShopData:function(){
			var _this = this;
			var params = {
				success: function(data){
					data =JSON.parse(data);
					_this.insertShop(data.data);
				}
			}
			sendAjax('json/shop.json',params)
		},
		insertShop:function(data){
			var arr = [];
			for(var i = 0; i<data.length; i++){
				 arr.push(`<div>
                            商品名称:<span class="shop-name">${data[i].name}</span><br />
                            数量: <input class="shop-count" type="number"  value="1" /><br />
                            价格: <span class="shop-price">${data[i].price}</span><br />
                            <button class="btn shop-btn-car" attr-id=${data[i].id}>加入购物车</button>
                        </div>`);
                
			}
			  this.$ele.innerHTML = arr.join('');
		},
		addCar: function(id, count){
			var shopList = localStorage.shop || '[]';
			shopList = JSON.parse(shopList);
			for(var i = 0; i< shopList.length; i++) {
				if(shopList[i].id == id) {
				shopList[i].count = Number(shopList[i].count) + Number(count);
				break;
				}
			}
			if(i == shopList.length) {
				shopList.push({id: id, count: count});
			}
			localStorage.shopList = JSON.stringify(shopList);
		}

	}

}())
