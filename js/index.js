// 首页index.html私有的JS文件

//页面载入事件
addEvent(window, "load", function(){
	var more=document.getElementById("more");
	//当鼠标移上“更多”的时候，给div(“更多”超链接的爷爷)加on(让它的边显示)
	addEvent(more, "mouseover",function(){
		this.parentNode.parentNode.className = 'on';
	});
	//当鼠标离开“更多”外侧div的时候，给这个div去掉on
	addEvent(more.parentNode.parentNode, 'mouseleave', function(e){
		this.className = '';
	});


	// 名店抢购的倒计时
	//每隔一秒，让名店抢购的时间减小一秒
	//
	//先得到剩余的时间
	var brand_title=document.getElementById("brand-title");
	var brand_section=document.getElementById("brand-section");
	var brand_title_timers=brand_title.getElementsByTagName('i');
	var left_hours=parseInt(brand_title_timers[0].innerHTML+brand_title_timers[1].innerHTML);
	var left_minutes=parseInt(brand_title_timers[2].innerHTML+brand_title_timers[3].innerHTML);
	var left_seconds=parseInt(brand_title_timers[4].innerHTML+brand_title_timers[5].innerHTML);
	console.log(left_hours);
	console.log(left_minutes);
	console.log(left_seconds);
	//目前总共剩余的秒数为：
	var total_seconds=left_hours*3600+left_minutes*60+left_seconds;
	var brand_timing=setInterval(function(){
			total_seconds--;
			left_hours=Math.floor(total_seconds/3600);
			left_minutes=Math.floor((total_seconds%3600)/60);
			left_seconds=(total_seconds%3600)%60;
			//console.log('剩余的小时数为：'+left_hours+'，剩余的分钟数为：'+left_minutes+'，剩余的秒数为：'+left_seconds+'');
			brand_title_timers[0].innerHTML=Math.floor(left_hours/10);
			brand_title_timers[1].innerHTML=left_hours%10;
			brand_title_timers[2].innerHTML=Math.floor(left_minutes/10);
			brand_title_timers[3].innerHTML=left_minutes%10;
			brand_title_timers[4].innerHTML=Math.floor(left_seconds/10);
			brand_title_timers[5].innerHTML=left_seconds%10;
			if(total_seconds<=0){
				brand_title.style.display="none";
				brand_section.style.display="none";
				clearInterval(brand_timing);			}
	},1000);
});


addEvent(window,"load",function(){
	var index=0;
	var banner=document.getElementById('banner');
	var banner_spans=banner.getElementsByTagName("span");
	var banner_ul=banner.getElementsByTagName("ul")[0];
	var banner_ul_lis=banner.getElementsByTagName("li");
	var timer;

	//当页面加载完毕的时候，判断图片的组数，并且显示在向后按钮中
	banner_spans[1].innerHTML=(index+1)+'/'+banner_ul_lis.length;
	
	
	//当鼠标移上焦点图的时候，显示向前和向后按钮
	//当鼠标移上焦点图的时候，停止图片的自动播放
	addEvent(banner,"mouseover",function(){
		for(var i=0;i<banner_spans.length;i++){
			banner_spans[i].style.display="block";
		}
		clearInterval(timer);
	});

	//当鼠标离开焦点图的时候，隐藏向前和向后按钮
	//当鼠标离开焦点图的时候，每隔三秒，播放下一组图片
	addEvent(banner,"mouseout",function(){
		for(var i=0;i<banner_spans.length;i++){
			banner_spans[i].style.display="none";
		}
		timer=setInterval(function(){
			banner_spans[1].click();
		},3000);
	});

	//当单击向后按钮的时候，播放下一组图片
	addEvent(banner_spans[1],"click",function(){
		index++;
		if(index>=banner_ul_lis.length){
			index=0;
		}
		move(banner_ul,-index*689);
		// banner_ul.style.left='-'+(index*689)+'px';
		banner_spans[1].innerHTML=(index+1)+"/"+banner_ul_lis.length;
	});
	//当单击向前按钮的时候，播放上一组图片
	addEvent(banner_spans[0],"click",function(){
		index--;
		if(index<0){
			index=4;
		}
		move(banner_ul,-index*689);
		// banner_ul.style.left='-'+(index*689)+'px';
		banner_spans[1].innerHTML=(index+1)+"/"+banner_ul_lis.length;
	});

	//每隔三秒(3000毫秒)，自动播放下一组图片:每隔三秒，自动单击向后按钮
	timer=setInterval(function(){
		banner_spans[1].click();
	},3000);

});