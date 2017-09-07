// 公用的JS文件

//页面载入事件
addEvent(window,"load",function(){
	var favorite=document.getElementById("favorite");
	var favorite_span=favorite.getElementsByTagName("span")[0];
	//当鼠标放上的时候.空心变实心
	addEvent(favorite,"mouseover",function(e){
		favorite_span.innerHTML="&#xe61a;";
		favorite_span.style.color="#f76120";
	});
	//当鼠标离开的时候.实心变空心
	addEvent(favorite,"mouseout",function(e){
		favorite_span.innerHTML="&#xe656;";
		favorite_span.style.color="#666";
	});
	//当鼠标单击“收藏美团”的时候，收藏美团
	addEvent(favorite, 'click', function(e){
		var title = '美团网';    //网站的标题
		var url   = 'http://www.meituan.com';   //收藏网站的url

		try {
		    window.external.addFavorite(url, title);
		}catch (e) {
		    try {
		       window.sidebar.addPanel(title, url, "");
		    }catch (e) {
		         alert("抱歉，您的浏览器不支持此操作。\n\n请使用按键Ctrl + D 收藏美团。");
		    }
		}
	});


	/*用户导航右侧的菜单*/
	var user_nav_right=document.getElementById("user-nav-right");
	var user_nav_right_lis = user_nav_right.getElementsByTagName("li");
	//当鼠标移上用户导航右侧的菜单的时候，显示它下方的二级菜单（给它加on）
	//当鼠标离开用户导航右侧的菜单的时候，隐藏它下方的二级菜单（给它去掉on）
	for(var i=0;i<user_nav_right_lis.length;i++){
		if(user_nav_right_lis[i].getElementsByTagName("ul").length>0){
			addEvent(user_nav_right_lis[i],"mouseover",function(){
				this.className="dropdown on";
			});
			addEvent(user_nav_right_lis[i],"mouseout",function(){
				this.className="dropdown";
			});
		}
	}

	//搜索选项
	var search_select = document.getElementById('search-select');
	//当鼠标移上搜索选项的时候，显示所有的搜索选项（给它加on类）
	addEvent(search_select, 'mouseover', function(e){
		this.className = 'on';
	});
	//当鼠标离开搜索选项的时候，值显示第一个搜索选项（给它去掉on类）
	addEvent(search_select, 'mouseout', function(e){
		this.className = '';
	});
	//当单击某个搜索选项的时候，它应该成为父级的第一个孩子
	var search_select_lis=search_select.getElementsByTagName("li");
	for(var i=0;i<search_select_lis.length;i++){
		addEvent(search_select_lis[i],"click",function(){
			this.parentNode.insertBefore(this,this.parentNode.firstChild);
		});
	}
	var q=document.getElementById("q");
	//当搜索框获取焦点时，
	addEvent(q,"focus",function(){
		if(q.value=='请输入商家名称、地址等'){
			q.value="";
			q.style.color = '#170000';
		}
	});
	//当搜索框失去焦点时
	addEvent(q,"blur",function(){
		if(q.value==''){
			q.value="请输入商家名称、地址等";
			q.style.color = '#a9a9a9';
		}
	});
	//分类导航
	//当鼠标移上某个分类导航的li的时候，应该显示它下方的二级菜单(加on类)；
	//当鼠标离开某个分类导航的li的时候，应该隐藏它下方的二级菜单(去掉on类)；
	var category=document.getElementById("category");
	var category_lis=category.getElementsByTagName("li");
	for(var i=0;i<category_lis.length;i++){
			addEvent(category_lis[i],"mouseover",function(){
				this.className="on";
			});
			addEvent(category_lis[i],"mouseout",function(){
				this.className="";
			});
	}
	
	//当鼠标移上分类导航的ul的时候，让它的左边框和下边框颜色变深(给它加active类)
	var category=document.getElementById("category");
	addEvent(category,"mouseover",function(){
		this.className="active";
	});
	addEvent(category,"mouseout",function(){
		this.className="";
	});

	/*页脚导航*/
	var footer_nav=document.getElementById("footer-nav");
	var footer_nav_lis=footer_nav.getElementsByTagName("li");
	var footer_nav_divs=footer_nav.getElementsByTagName("div");
	for(var i=0;i<footer_nav_lis.length;i++){
		footer_nav_lis[i].index=i;
		addEvent(footer_nav_lis[i] ,"click",function(){
			for(var j=0;j<footer_nav_lis.length;j++){
				footer_nav_lis[j].style.backgroundColor="#f9f9f9";
				footer_nav_divs[j].style.display="none";
			}

			this.style.backgroundColor="#eee";
			footer_nav_divs[this.index].style.display="block";
		});
	}


	/*回到顶部*/

	var toTop=document.getElementById("toTop");
	var win_height=document.documentElement.clientHeight;
	var win_top;
	addEvent(window,"scroll",function(){
		win_top=document.body.scrollTop||document.documentElement.scrollTop;


		if(win_top>=win_height){
			toTop.style.display="block";
		}else{
			toTop.style.display="none";
		}
	});

	/*图片的延迟加载*/

	//先得到所有的图片
	var imgs=document.getElementsByTagName("img");
	//得到需要延迟加载的图片
	var lazy_imgs=new Array();
	for(var i=0;i<imgs.length;i++){
		if(imgs[i].getAttribute("data-src")!=null){
			lazy_imgs.push(imgs[i]);
		}	
	}
	console.log(lazy_imgs);
	var win_top;
	var win_height=document.documentElement.clientHeight;
	//console.log(lazy_imgs[0].offsetParent,lazy_imgs[0].offsetTop );
	//console.log( lazy_imgs[0].parentNode.offsetParent, lazy_imgs[0].parentNode.offsetTop );
	function scroll_fn(){
		win_top=document.documentElement.scrollTop||document.body.scrollTop;
		for(var j=0;j<lazy_imgs.length;j++){
			

			if(lazy_imgs[j].parentNode.offsetTop>win_top&&lazy_imgs[j].parentNode.offsetTop<=(win_top+win_height)){
				lazy_imgs[j].src=lazy_imgs[j].getAttribute("data-src");
			}
		}
	}


	addEvent(window,"scroll",scroll_fn);
	scroll_fn();   
});