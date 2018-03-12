$(window).ready(function(){
	//左边导航区的高度为可视区高度。
	$("#nav-left").height($(window).height());
	//改变可视区大小，高度自适应
	$(window).resize(function(){
		$("#nav-left").height($(window).height());
	});

	//小屏下点击出现和隐藏菜单栏
	$(".menu").click(function(){
		$(".nav-mobile").slideToggle();
	});
	//屏幕大小改变隐藏菜单栏
	$(window).resize(function(){
		$(".nav-mobile").hide();
	});
})