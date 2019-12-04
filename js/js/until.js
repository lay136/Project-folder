/*
	obj 要改变的是那个元素
	attr 要改变的是那个属性
	target 要将该属性的值改到多少
*/
//匀速动画
function animate(obj,attr,target){//animate函数里面写参数
	clearInterval(obj.timer);//关闭定时器
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		var current = parseFloat(getComputedStyle(obj,false)[attr]);
		//getComputedStyle获取所有属性的值

		if(attr == 'opacity'){
			current = Math.round(current * 100);//针对透明度的设置
		}
		//匀速动画速度
		if(current < target){
			iSpeed = 9;
		}else{
			iSpeed = -9;
		}
		//匀速动画的结束条件
		if(Math.abs(target - current) < Math.abs(iSpeed)){
			if(attr == 'opacity'){
			//判断传进的值，如果是opacity除以100，否则不除，加长度单位
				obj.style[attr] = target / 100;
			}else{
				obj.style[attr] = target + 'px';
			}
			clearInterval(obj.timer);//关闭定时器
		}else{
			if(attr == 'opacity'){//改变样式
				obj.style[attr] = (current + iSpeed) / 100;
			}else{
				obj.style[attr] = current + iSpeed + 'px';
			}
		}
	},30);
}

function getScrollTop(){//window渲染模式处理函数
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}