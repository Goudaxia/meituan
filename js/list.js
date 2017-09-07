// 列表页list.html私有的JS文件

addEvent(window,"load",function(){
	// 广告
	// 当单击叉号的时候，关闭广告
	// 
	// 
	var ad_btn=document.getElementById("ad-btn");
	addEvent(ad_btn,"click",function(){
		ad_btn.parentNode.style.display="none";
	});


	// "最近浏览"的吸顶效果
	// 
	var recent_visit=document.getElementById("recent-visit");
	console.log(recent_visit.offsetParent,recent_visit.offsetTop);
	var recent_visit_top=recent_visit.offsetTop;//"最近浏览"文档坐标值纵坐标
	var win_top;   //窗口滚动坐标值的纵坐标
	addEvent(window,"scroll",function(){
		win_top=document.documentElement.scrollTop||document.body.scrollTop;
		if(win_top>=recent_visit_top){
			recent_visit.style.position="fixed";
			recent_visit.style.top="0px";
		}else{
			recent_visit.style.position="static";
		}


	});

	// 价格区间
	var price_range=document.getElementById("price-range");
	addEvent(price_range,"mouseover",function(){
		price_range.className="active";
	});
	addEvent(price_range,"mouseout",function(){
		price_range.className="";
	});

	//选中
	var list_title=document.getElementById("list-title");
	var list_title_div=list_title.getElementsByTagName("div")[0];
	var list_title_div_as=list_title_div.getElementsByTagName("a");
	for(var i=0;i<list_title_div_as.length;i++){
		addEvent(list_title_div_as[i],"click",function(){
			
			this.className="base checked";
		});
	}
	
});
