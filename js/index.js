window.onload=function(){
	//设置左边导航区和右边内容区的高度为可视区高度。
	var oNavLeft=document.getElementById("nav-left");
	var oContent=document.getElementById("content");
	oNavLeft.style.height=document.documentElement.clientHeight+"px";
	oContent.style.height=document.documentElement.clientHeight+"px";
}