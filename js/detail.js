// 详情页detail.html私有的JS文件

addEvent(window,"load",function(){
	/********************************************
		焦点图部分
	********************************************/
	var banner=document.getElementById("banner");
	var banner_spans=banner.getElementsByTagName("span");
	var banner_ol=banner.getElementsByTagName("ol")[0];
	var banner_ol_imgs=banner_ol.getElementsByTagName("img");
	var datu = document.getElementById('datu'); 
	var index=0;    //当前小图的索引值

	//当鼠标移上焦点图的时候，显示向前和向后按钮
	addEvent(banner,"mouseover",function(){
		for(var i=0;i<banner_spans.length;i++){
			banner_spans[i].style.display="block";
		}
	});
	//当鼠标离开焦点图的时候，隐藏向前和向后按钮
	addEvent(banner,"mouseout",function(){
		for(var i=0;i<banner_spans.length;i++){
			banner_spans[i].style.display="none";
		}
	});

	//当单击向后按钮的时候，让当前小图后面的小图处于当前状态，并且显示对应的大图
	addEvent(banner_spans[1],"click",function(){
		//下一个小图的索引值为
		index++;
		if(index>=banner_ol_imgs.length){
			index=0;
		}
		//小图的工作:让下一个小图处于当前状态(加cur类)，其他小图都不出于当前状态
		//先排除所有
		for(var j=0;j<banner_ol_imgs.length;j++){
			banner_ol_imgs[j].className="";
		}
		//再确立自己
		banner_ol_imgs[index].className="cur";
		//大图的工作
		datu.src=banner_ol_imgs[index].getAttribute("data-datu");
	});

	//当单击向前按钮的时候，...
	addEvent(banner_spans[0],"click",function(){
		//下一个小图的索引值为
		index--;
		if(index<0){
			index=banner_ol_imgs.length-1;
		}
		//小图的工作:让下一个小图处于当前状态(加cur类)，其他小图都不出于当前状态
		//先排除所有
		for(var j=0;j<banner_ol_imgs.length;j++){
			banner_ol_imgs[j].className="";
		}
		//再确立自己
		banner_ol_imgs[index].className="cur";
		//大图的工作
		datu.src=banner_ol_imgs[index].getAttribute("data-datu");
	});
	//当鼠标移上某个小图的时候，它处于当前状态，并且显示它对应的大图
	for(var i=0;i<banner_ol_imgs.length;i++){
		banner_ol_imgs[i].idx=i;
		addEvent(banner_ol_imgs[i],"mouseover",function(){
			for(var j=0;j<banner_ol_imgs.length;j++){
				banner_ol_imgs[j].className="";
			}
			this.className="cur";
			datu.src=this.getAttribute("data-datu");
			index=this.idx;
		});
	}
	


	// detail-nav吸顶效果
	
	var	detail_nav=document.getElementById("detail-nav");
	var detail_nav_top=	detail_nav.offsetTop;
	var win_top;
	//console.log(detail_nav_top,detail_nav.offsetParent);
	addEvent(window,"scroll",function(){
		win_top=document.body.scrollTop||document.documentElement.scrollTop;

		if(win_top>=detail_nav_top){
			detail_nav.className="on";
		}else{
			detail_nav.className="";
		}
	});

	var detail=document.getElementById("detail");
	var detail_nav_lis=detail_nav.getElementsByTagName("li");
	var detail_h2s=detail.getElementsByTagName("h2");
	var win_top;
	var h2_index;
	addEvent(window,'scroll',function(){
		win_top=document.body.scrollTop||document.documentElement.scrollTop;
		win_top+=44;
		
		if(win_top>=detail_h2s[0].offsetTop){
			h2_index=0;
		}
		if(win_top>=detail_h2s[1].offsetTop){
			h2_index=1;
		}
		if(win_top>=detail_h2s[2].offsetTop){
			h2_index=2;
		}
		if(win_top>=detail_h2s[3].offsetTop){
			h2_index=3;
		}
		for(var i=0;i<detail_h2s.length;i++){
			detail_nav_lis[i].className="";
		}
		detail_nav_lis[h2_index].className="cur";
	});


	/*评论列表的图片*/
	var comment_list=document.getElementById("comment-list");
	var comment_list_is=comment_list.getElementsByTagName("i");
	//当单击某个小图区域的时候，让它处于当前状态，其他小图区域都不处于当前状态
	for(var i=0;i<comment_list_is.length;i++){
		addEvent(comment_list_is[i],"click",function(){
			//判断：如果当前小图对应的大图是没有显示的(它没有cur类)，那么单击该小图，才显示对应的大图
			//如果当前小图对应的大图是显示的(它有cur类)，那么再单当前小图，大图应该隐藏
			if(this.className!="cur"){
				//小图的工作：单击的那个小图处于当前状态(加cur类)，其他都不出于当前状态(不加cur类)
				//先排除：排除的时候在其亲兄弟姐妹中排除
				//先得到该元素的亲兄弟姐妹：它父母的孩子
				var this_siblings=this.parentNode.getElementsByTagName("i");
				for(var j=0;j<this_siblings.length;j++){
					this_siblings[j].className="";
				}
				//再确立
				this.className="cur";


				//大图的工作:让当前小图对应的大图在h6中显示
				//存放大图的h6是当前事件源的叔叔:爸爸的爸爸的孩子h6
				this.parentNode.parentNode.getElementsByTagName("h6")[0].innerHTML='<img src="'+this.getAttribute("data-datu")+'">';
			}else{
				this.parentNode.parentNode.getElementsByTagName("h6")[0].innerHTML='';
				this.className="";
			}
			
		});
	}

});