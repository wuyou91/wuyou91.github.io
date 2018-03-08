window.onload=function(){
	//设置左边导航区和右边内容区的高度为可视区高度。
	var oNavLeft=document.getElementById("nav-left");
	var oContent=document.getElementById("content");
	oNavLeft.style.height=document.documentElement.clientHeight+"px";
	oContent.style.height=document.documentElement.clientHeight+"px";

	//小屏下点击出现和影藏菜单栏
	$(".menu").click(function(){
		$(".nav-mobile").slideToggle();
	})
	//屏幕大小改变影藏菜单栏
	$(window).resize(function(){
		$(".nav-mobile").hide();
	})
}