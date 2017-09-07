// 公用的函数库


/**************************************************************************
	功能：兼容多浏览器的事件绑定方式
	参数：参数1：obj      事件源
	      参数2：type     事件类型    需要是一个字符串，前面不加on
	      参数3：handler  事件处理函数
**************************************************************************/
function addEvent(obj, type, handler){
	if(obj.addEventListener){    //能力检测:标准浏览器
		//标准浏览器中的事件绑定方式：事件源.addEventListener('事件类型', 事件处理函数)
		obj.addEventListener(type, handler);
	}else if(obj.attachEvent){   //能力检测：IE低版本浏览器
		//IE低版本浏览器中的事件绑定方式：事件源.attachEvent('on事件类型', 事件处理函数)
		obj.attachEvent('on'+type, handler);
	}else{    //以上皆不是
		//DOM0级的事件绑定方式
		//   事件源.on事件类型=事件处理函数
		//   事件源['on事件类型']=事件处理函数
		obj['on'+type] = handler;
	}
}


/**************************************************************************
	功能：兼容多浏览器的事件解绑方式
	参数：参数1：obj      事件源
	      参数2：type     事件类型    需要是一个字符串，前面不加on
	      参数3：handler  事件处理函数
**************************************************************************/
function removeEvent(obj, type, handler){
	if(obj.removeEventListener){    //能力检测:标准浏览器
		//标准浏览器中的事件绑定方式：事件源.addEventListener('事件类型', 事件处理函数)
		obj.removeEventListener(type, handler);
	}else if(obj.detachEvent){   //能力检测：IE低版本浏览器
		//IE低版本浏览器中的事件绑定方式：事件源.attachEvent('on事件类型', 事件处理函数)
		obj.detachEvent('on'+type, handler);
	}else{    //以上皆不是
		//DOM0级的事件绑定方式
		//   事件源.on事件类型=事件处理函数
		//   事件源['on事件类型']=事件处理函数
		obj['on'+type] = null;
	}
}

/*****************************************************
	功能：让指定的盒子运动到指定的位置。即：让el元素在一秒的时间逐渐运动到dest的位置
	参数： el     运动的元素
	       dest   需要运动到的位置，直接写数字，不加单位
*****************************************************/
function move(el, dest){
	var init_position = el.offsetLeft;   //元素的初始位置

	//该盒子需要走过的距离
	var distance = dest-init_position;    ////该盒子需要走过的距离

	//每隔10毫秒，走一步。需要在一秒(1000毫秒)走到终点
	//一共需要走多少步？
	var total_nums = 1000/10;    //需要走的步数

	var num = 0;    //当前走的步数
	
	//每一步需要走的步长
	var step = distance/total_nums;


	//每隔10毫秒，走一步
	var timer = setInterval(function(){
		//走一步
		num++;

		//盒子目前需要位于的位置
		// console.log( init_position+step*num );


		el.style.left = init_position+step*num+'px';

		//如果当前走的步数>=需要走的步数，那么就停止运动
		if(num >= total_nums){
			clearInterval(timer);

			//强制让该盒子走到终点
			el.style.left = dest+'px';
		}
	}, 10);
}