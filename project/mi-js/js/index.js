// alert('123');
handleCart();
handleNavContent();

//购物车
function handleCart(){
	//1.获取元素
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box a');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoader = oCartContent.querySelector('.loader');
	var oSpan = oCartContent.querySelector('span');
	//绑定移入事件
	oCart.onmouseenter = function(){
		oLoader.style.display = 'block';//显示购物车
		oCartBox.style.backgroundColor = '#fff';//购物车背景为白色
		oCartBox.style.color = '#ff6700';//字体为橘色
		oCartContent.style.height = '100px';//下方的购物信息

		animation(oCartContent,{height:100},true,function(){
			oLoader.style.display = 'none';
			oSpan.style.display = 'block';

		});
	}
	oCart.onmouseleave = function(){
		oCartBox.style.backgroundColor = '#424242';
		oCartBox.style.color = '#b0b0b0';
		animation(oCartContent,{height:0},true,function(){
			oSpan.style.display = 'none';
			oLoader.style.display = 'none';
		});
		
	}
}

// 下拉菜单
function handleNavContent(){
	//1.获取元素
	var aNavtiem = document.querySelectorAll('.header .header-nav-item');
	var oNavContent = document.querySelector('.header .header-nav-content');
	var oNavContentBox = oNavContent.querySelector('.container');
	// console.log('121');
	var hideTimer = 0,loadTimer = 0;
	// 移入事件
	for(var i = 0;i < aNavtiem.length - 2;i++){
		aNavtiem[i].index = i;
		aNavtiem[i].onmouseenter = function(){
			oNavContentBox.innerHTML = '<div class="loader"></div>'//显示加载中的图标
			clearTimeout(hideTimer);
			oNavContent.style.borderTop = '1px solid #ccc';
			animation(oNavContent,{height:200});
			var index = this.index;
			//加载数据
			clearTimeout(loadTimer)
			loadTimer = setTimeout(function(){
				loadData(index);
			},500);
		}
		aNavtiem[i].onmouseleave = function(){
			handleHide();
		}
	}
	oNavContent.onmouseenter = function(){
		clearTimeout(hideTimer);
	}
	oNavContent.onmouseleave = function(){
		handleHide();
	}
	function handleHide(){
		hideTimer =setTimeout(function(){
			animation(oNavContent,{height:0},true,function(){
				oNavContent.style.borderTop = '';
			})
		},500);
	}

	function loadData(index){
		console.log(index);

	}


}